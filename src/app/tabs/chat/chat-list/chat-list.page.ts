import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Chat_Model, MessageStatus } from 'src/app/definitions/models/SignalR.model';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  Chats: Chat_Model[] = [];
  MessageStatus = MessageStatus;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    public baseService: BaseService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.appComponent.ChatHUB.onConnected$.subscribe((data: any) => {
        this.loadUsersChats();
      })
    );
    this.subscriptions.add(
      this.appComponent.ChatHUB.onReceiveChat$.subscribe((data: any) => {
        this.loadUsersChats();
      })
    );
    this.subscriptions.add(
      this.appComponent.ChatHUB.onReactMessage$.subscribe((data: any) => {
        this.loadUsersChats();
      })
    );
    this.subscriptions.add(
      this.appComponent.ChatHUB.onReceiveMessage$.subscribe((data: any) => {
        this.loadUsersChats();
      })
    );
    this.subscriptions.add(
      this.appComponent.ChatHUB.onReceiveTyping$.subscribe((data: any) => {
        this.chatTyping(data);
      })
    );
  }

  ionViewDidEnter() {
    this.loadUsersChats();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async loadUsersChats() {
    this.Chats = await this.appComponent.ChatHUB.Chats();
    console.log('this.Chats', this.Chats);
  }

  goToVeiw(usersChats: any) {
    this.router.navigate(['./view', usersChats.Client_Id]);
  }

  chatTyping(data: any) {
    if (this.Chats) {
      let typingChat = this.Chats.find((x) => x.Client_Id === data.Client_Id);

      if (typingChat) {
        typingChat.isTyping = true;

        setTimeout(() => {
          if (typingChat) {
            typingChat.isTyping = false;
          }
        }, 2000);
      }
    }
  }
}
