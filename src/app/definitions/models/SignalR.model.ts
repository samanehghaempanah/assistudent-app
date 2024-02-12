import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";
import { BaseService } from "src/app/services/base.service";
import { StorageService } from "src/app/services/storage.service";
import { FilteringModel } from "./Common.model";

export class SignalR_HUB {

    private hubConnection: signalR.HubConnection | undefined;

    private _isConnected: boolean = false;

    private onConnected = new Subject<any>(); public onConnected$ = this.onConnected.asObservable();
    private onDisconnected = new Subject<any>(); public onDisconnected$ = this.onDisconnected.asObservable();
    private onReceiveTyping = new Subject<any>(); public onReceiveTyping$ = this.onReceiveTyping.asObservable();
    private onReceiveMessage = new Subject<any>(); public onReceiveMessage$ = this.onReceiveMessage.asObservable();
    private onReactMessage = new Subject<any>(); public onReactMessage$ = this.onReactMessage.asObservable();
    private onReceiveChat = new Subject<any>(); public onReceiveChat$ = this.onReceiveChat.asObservable();
    private onReloadChat = new Subject<any>(); public onReloadChat$ = this.onReloadChat.asObservable();

    private setupEvents() {
        if (this.hubConnection) {
            this.hubConnection.on('onConnected', (data: any) => { this.hubConnected(data); });
            this.hubConnection.on('onDisconnected', (data: any) => { this.hubDisconnected(data); });
            this.hubConnection.onclose((data: any) => { this.hubDisconnected(data); });
            this.hubConnection.on('onReceiveTyping', (data: any) => { this.hubReceivedTyping(data); });
            this.hubConnection.on('onReceiveMessage', (data: any) => { this.hubReceivedMessage(data); });
            this.hubConnection.on('onReactMessage', (data: any) => { this.hubReactedMessage(data); });
            this.hubConnection.on('onReceiveChat', (data: any) => { this.hubReceivedChat(data); });
            this.hubConnection.on('onReloadChat', (data: any) => { this.hubReloadChat(data); });
        }
    }

    constructor(
        private connectionURL: string,
        private apiURL: string,
        private storageService: StorageService,
        private baseService: BaseService) { }

    public get isConnect(): boolean { return this._isConnected; }

    public async Chats() {
        return this.storageService.Chats;
    }

    public async Messages(chatId: string, filteringModel: FilteringModel | null = null) {

        if (this.isConnect) {
            await this.GET_Messages(chatId, filteringModel);
        }

        return this.storageService.getChatMessages(chatId);
    }

    public async Connect() {

        if (!this._isConnected) {

            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(this.connectionURL, { accessTokenFactory: () => this.storageService.Token })
                .build();

                this.setupEvents();

                await this.hubConnection.start();

            // //// ---- JUST FOR ADMIN ---- \\\\
            // await this.JoinToSupportGroup();
        }

        return;
    }

    public async Disconnect() {

        if (this.hubConnection) {

            // //// ---- JUST FOR ADMIN ---- \\\\
            // await this.RemoveFromSupportGroup();

            return await this.hubConnection.stop();
        }

        return;
    }

    public async Send_Message(chatId: string, message: string): Promise<any> {

        // Connect to server
        await this.Connect();

        // Generate model
        let messageModel = new ChatMessage_Model();
        messageModel.Message = message;
        messageModel.Chat_Id = chatId;
        messageModel.Client_Id = crypto.randomUUID();
        messageModel.MessageType = MessageType.Text;
        messageModel.MessageStatus = MessageStatus.Draft;
        messageModel.Creation_date = new Date();
        messageModel.Me = true;

        // invoke send message service
        if (this.hubConnection) {
            messageModel = await this.hubConnection.invoke('SendMessage', JSON.stringify(messageModel));
        }

        // add message to array
        this.addMessage(messageModel);

        // return result
        return messageModel;
    }

    public async Send_Typing(chatId: string): Promise<any> {

        // Connect to server
        await this.Connect();

        // Generate model
        let chatModel = new Chat_Model();
        chatModel.Client_Id = chatId;

        // invoke send typing service
        if (this.hubConnection) {
            chatModel = await this.hubConnection.invoke('SendTyping', JSON.stringify(chatModel));
        }

        // return result
        return chatModel;
    }

    public async Send_React(chatId: string, messageId: string, messageStatus: MessageStatus): Promise<any> {

        // Connect to server
        await this.Connect();

        // Generate model
        let messageModel = new ChatMessage_Model();
        messageModel.Chat_Id = chatId;
        messageModel.Client_Id = messageId;
        messageModel.MessageStatus = messageStatus;

        // invoke send message service
        if (this.hubConnection) {
            messageModel = await this.hubConnection.invoke('SendReact', JSON.stringify(messageModel));

            // add message to array
            this.addMessage(messageModel);
        }

        // return result
        return messageModel;
    }

    async JoinToSupportGroup() {
        try {
            if (this.hubConnection) {

                const result: any = await this.hubConnection.invoke('JoinToSupportGroup');

                return result;
            }
            return null;

        } catch { }
    }

    async RemoveFromSupportGroup() {
        try {
            if (this.hubConnection) {

                const result: any = await this.hubConnection.invoke('RemoveFromSupportGroup');

                return result;
            }

            return null;

        } catch { }
    }

    private async hubConnected(data: any) {
        this._isConnected = true;

        await this.GET_Chats();

        this.onConnected.next(data);
    }

    private hubDisconnected(data: any) {
        this._isConnected = false;

        this.onDisconnected.next(data);
    }

    private hubReceivedTyping(data: any) {
        this.onReceiveTyping.next(data);
    }

    private hubReceivedMessage(data: any) {

        this.addMessage(data);

        this.Send_React(data.Chat_Id, data.Client_Id, MessageStatus.Delivered);

        this.onReceiveMessage.next(data);
    }

    private hubReceivedChat(data: any) {
        this.addChat(data);

        this.onReceiveChat.next(data);
    }

    private async hubReloadChat(data: any) {

        await this.GET_Chats();

        this.onReloadChat.next(data);
    }

    private hubReactedMessage(data: any) {
        this.addMessage(data);

        this.onReactMessage.next(data);
    }


    private addChat(item: Chat_Model) {

        let chats = this.storageService.Chats;

        if (!chats) { chats = []; }

        chats = chats.filter(x => x.Client_Id !== item.Client_Id);

        chats.unshift(item);

        this.storageService.Chats = chats;
    }

    private addMessage(item: ChatMessage_Model) {

        let messages = this.storageService.getChatMessages(item.Chat_Id);

        if (!messages) { messages = []; }

        let message = messages.find(x => x.Client_Id === item.Client_Id);

        if (message) { message = item; }

        else { messages.push(item); }

        this.storageService.setChatMessages(item.Chat_Id, messages);
    }


    private async GET_Chats(filteringModel: FilteringModel | null = null) {
        try {
            const result: any = await this.baseService.httpGET('', filteringModel, false, this.apiURL);

            if (result && result.Items) {
                result.Items.forEach((element: Chat_Model) => { this.addChat(element); });
            }

            return result;

        } catch { }
    }

    private async GET_Chat(chatId: string) {
        try {
            const result: any = await this.baseService.httpGET('', null, false, this.apiURL + chatId);

            if (result) { this.addChat(result); }

            return result;

        } catch { }
    }

    private async GET_Messages(chatId: string, filteringModel: FilteringModel | null = null) {
        try {
            const result: any = await this.baseService.httpGET('', filteringModel, false, this.apiURL + chatId + '/messages');

            if (result && result.Items) {
                result.Items.forEach((element: ChatMessage_Model) => { this.addMessage(element); });
            }

            return result;

        } catch { }
    }

    private async GET_ChatUsers(filteringModel: FilteringModel | null = null, chatId: string) {
        try {
            const result: any = await this.baseService.httpGET('', filteringModel, false, this.apiURL + chatId + '/users');

            return result;

        } catch { }
    }

    private async GET_ChatUser(chatId: string) {
        try {
            const result: any = await this.baseService.httpGET('', null, false, this.apiURL + chatId + '/user');

            if (result) { this.addChat(result); }

            return result;

        } catch { }
    }
}

export class Chat_Model {
    ChatType: ChatType = ChatType.Support;
    ChatType_Title: string = '';
    Client_Id: string = '';
    Title: string = '';
    ProfileImageFile: string = '';
    LastMessage_Id: number = 0;
    LastMessage_Hint: string = '';
    LastMessage_Status: MessageStatus = MessageStatus.Draft;
    LastMessage_Status_Title: string = '';
    LastMessage_Date: string = '';
    UnreadMessageCount: number = 0;
    PinSequence: number = 0;
    isTyping: boolean = false;
    User_Id: string = '';
}

export class ChatMessage_Model {
    Chat_Id: string = '';
    Client_Id: string = '';
    Message: string = '';
    MessageType: MessageType = MessageType.Text;
    MessageType_Title: string = '';
    MessageStatus: MessageStatus = MessageStatus.Draft;
    MessageStatus_Title: string = '';
    Replay_Id: string = '';
    Replay_Hint: string = '';
    Creation_date: any;
    User_Id: string = '';
    User_Title: string = '';
    User_ProfileImageFile: string = '';
    Me: boolean = false;
    Role: ChatRole = ChatRole.User;
    Role_Title: string = '';

    isSelected: boolean = false;
    disabled: boolean = false;
}

export class ChatUser_Model {
    Chat_Id: string = '';
    User_Id: string = '';
    User_Title: string = '';
    User_ProfileImageFile: string = '';
    Me: boolean = false;
    Role: ChatRole = ChatRole.User;
    Role_Title: string = '';
    UnreadMessageCount: number = 0;
    PinSequence: number = 0;
}

export enum ChatType {
    Support = 0,
    Person = 1,
    Group = 2,
    Channel = 3
}

export enum ChatRole {
    User = 0,
    Admin = 1,
    Support = 2
}

export enum MessageType {
    Text = 0,
    Image = 1,
    Video = 2,
    PDF = 3,
    ETC = 10
}

export enum MessageStatus {
    Draft = 0,
    ReceivedByServer = 1,
    Delivered = 2,
    Seen = 3
}
