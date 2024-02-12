import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ChatMessage_Model, Chat_Model, MessageStatus } from 'src/app/definitions/models/SignalR.model';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  MessageStatus = MessageStatus;

  displayOptions: boolean = false;
  PageData = { Waiting: false, ChatMessage: '', Item: new Chat_Model() };
  Messages: ChatMessage_Model[] = [];

  private subscriptions = new Subscription();

  constructor(
    public baseService: BaseService,
    public route: ActivatedRoute,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {

    // get chatId from query string
    this.PageData.Item.Client_Id = this.route.snapshot.paramMap.get('id') ?? '';

    this.subscriptions.add(this.appComponent.ChatHUB.onReceiveMessage$.subscribe((data: any) => { this.onReceiveMessage(data); }));
    this.subscriptions.add(this.appComponent.ChatHUB.onReactMessage$.subscribe((data: any) => { this.onReceiveMessage(data); }));
    this.subscriptions.add(this.appComponent.ChatHUB.onReceiveTyping$.subscribe((data: any) => { this.onReceiveTyping(data); }));
  }

  ionViewDidEnter() {

    this.loadChatItem();

    this.LoadMessages();

    setTimeout(() => { if (this.content) { this.content.scrollToBottom(500); } }, 500);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onReceiveMessage(data: ChatMessage_Model) {
    if (data.Chat_Id === this.PageData.Item.Client_Id) {
      this.addMessage(data);
    }
  }

  onReceiveTyping(data: Chat_Model) {

    if (data.Client_Id === this.PageData.Item.Client_Id) {

      this.PageData.Item.isTyping = true;

      setTimeout(() => { this.PageData.Item.isTyping = false; }, 2000);
    }
  }

  async loadChatItem() {

    const chats = await this.appComponent.ChatHUB.Chats();

    if (chats) {
      this.PageData.Item = chats.find(x => x.Client_Id === this.PageData.Item.Client_Id);
    }
  }

  async LoadMessages() {
    const messages = await this.appComponent.ChatHUB.Messages(this.PageData.Item.Client_Id);
    if (messages) {
      messages.forEach((messageItem: any) => { this.addMessage(messageItem); });
    }
  }

  async sendTyping() {
    await this.appComponent.ChatHUB.Send_Typing(this.PageData.Item.Client_Id);
  }

  async sendMessage() {
    if (!this.PageData.Waiting) {

      this.PageData.Waiting = true;

      const result: any = await this.appComponent.ChatHUB.Send_Message(this.PageData.Item.Client_Id, this.PageData.ChatMessage);

      if (result) {

        this.addMessage(result);

        this.PageData.ChatMessage = '';

        setTimeout(() => { if (this.content) { this.content.scrollToBottom(500); } }, 500);
      }

      this.PageData.Waiting = false;
    }
  }

  private addMessage(item: ChatMessage_Model) {

    let message = this.Messages.find(x => x.Client_Id === item.Client_Id);

    if (message) { message = item; }

    else {
      this.Messages.push(item);
      this.Messages.sort((a, b) => new Date(a.Creation_date).getTime() - new Date(b.Creation_date).getTime());
    }

    if (item.MessageStatus != MessageStatus.Seen && !item.Me) {
      this.appComponent.ChatHUB.Send_React(item.Chat_Id, item.Client_Id, MessageStatus.Seen);
    }
  }

  selectMessage(msgNumber: number) {
    var ItemSelected = [];
    this.Messages[msgNumber].isSelected = !this.Messages[msgNumber].isSelected;
    this.Messages[msgNumber].disabled = !this.Messages[msgNumber].disabled;
    ItemSelected = this.Messages.filter((item) => item.isSelected == true);
    if (ItemSelected.length === 1) {
      this.displayOptions = true;
      this.content.scrollByPoint(0, 100, 10);
    } else if (ItemSelected.length === 0) {
      this.displayOptions = false;
      if (msgNumber < this.Messages.length - 4)
        this.content.scrollByPoint(0, -100, 10);
    }
  }
}
