import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuType } from '../definitions/models/DataTypes.model';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

let preUrl = 'Authentication';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private onMenuChanged = new Subject<any>(); public onMenuChanged$ = this.onMenuChanged.asObservable();

    constructor(public baseService: BaseService, public storageService: StorageService) { }

    async Login(username: string, password: string) {

        let body = {
            Username: this.baseService.faToEn(username),
            Password: this.baseService.faToEn(password)
        };

        let result: any = await this.baseService.httpPOST(preUrl + '/login', body, true);

        if (result.Token) {

            // Set Token to Storage
            this.storageService.Token = result;

            // Load User info
            let resultInfo = await this.Info();

            // Load Menu list
            await this.Menu();
        }

        else { this.storageService.ConfirmToken = result; }

        return result;
    }

    async LoginConfirm(confirmCode: string) {

        let confirmToken = this.storageService.ConfirmToken;

        if (confirmCode && confirmToken) {

            let body = { Code: this.baseService.faToEn(confirmCode) , Data: confirmToken.Data };

            let result = await this.baseService.httpPOST(preUrl + '/confirm', body, true);

            if (result) {

                // Set Token to Storage
                this.storageService.Token = result;

                // Load User info
                let resultInfo = await this.Info();

                // Load Menu list
                await this.Menu();

                return resultInfo;
            }
        }

        return null;
    }

    async Register(body: any) {

        let result = await this.baseService.httpPOST(preUrl + '/register', body, true);

        if (result) { return result; }

        return null;
    }

    async RegisterSubmit(body: any) {

        let result = await this.baseService.httpPOST(preUrl + '/register/submit', body, true);

        if (result) {

            // Set Token to Storage
            this.storageService.Token = result;

            // Load User info
            let resultInfo = await this.Info();

            // Load Menu list
            await this.Menu();

            return resultInfo;
        }

        return null;
    }

    async Roles() {

        let result = await this.baseService.httpGET(preUrl + '/role', true);

        if (result) { return result; }

        return null;
    }

    Logout() {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/logout', null, true).then((result: any) => {
                if (result) { resolve(result); }
            }, (err) => { reject(err); })
                .finally(() => { this.storageService.Logout(); });
        });
    }

    Password(currentPassword: string, confirmPassword: string, newPassword: string) {
        return new Promise(async (resolve, reject) => {
            let body = {
                CurrentPassword: currentPassword,
                ConfirmPassword: confirmPassword,
                NewPassword: newPassword
            };
            this.baseService.httpPOST(preUrl + '/password', body, true).then((result: any) => {
                if (result) { resolve(result); }
            }, (err) => { reject(err); });
        });
    }

    async Info() {

        let result = await this.baseService.httpGET(preUrl + '/info');

        if (result) {
            this.storageService.User = result;
            return result;
        }

        return null;
    }

    async Menu() {

        let result: any = await this.baseService.httpGET(preUrl + '/menu');

        if (result && result.Items) {
            this.storageService.Menu = result.Items;
            this.onMenuChanged.next(this.storageService.Menu);
            return result.Items;
        }

        return null;
    }

    IFrame(iframeName: string) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpGET(preUrl + '/iframe/' + iframeName).then((result: any) => {
                if (result) {
                    resolve(result);
                }
            }, (err) => { reject(err); });
        });
    }

    ProfileImage(body: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/profileimage', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    Profileinfo(body: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/Profileinfo', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    FCM_Connect(fcmToken: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/fcm/connect', { Token: fcmToken }, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    FCM_Disconnect(fcmToken: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/fcm/disconnect', { Token: fcmToken }, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    Address_GET() {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpGET(preUrl + '/address', true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    Address_POST(body: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPOST(preUrl + '/address', body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    Address_PUT(id: number, body: any) {
        return new Promise(async (resolve, reject) => {
            this.baseService.httpPUT(preUrl + '/address/' + id, body, true).then((result: any) => { resolve(result); }, (err) => { reject(err); });
        });
    }

    async Password_Reset(body: any) {

        let result = await this.baseService.httpPOST(preUrl + '/password/reset', body, true);

        if (result) { return result; }

        return null;
    }

    async Password_Submit(body: any) {

        let result = await this.baseService.httpPOST(preUrl + '/password/submit', body, true);

        if (result) {

            // Set Token to Storage
            this.storageService.Token = result;

            // Load User info
            let resultInfo = await this.Info();

            // Load Menu list
            await this.Menu();

            return resultInfo;
        }

        return null;
    }

    Images: any[] = [
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner01.jpeg',
            alt: 'My University '
        },
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner02.jpeg',
            alt: 'My University '
        },
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner03.jpeg',
            alt: 'My University '
        },
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner04.jpeg',
            alt: 'My University '
        },
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner05.jpeg',
            alt: 'My University '
        },
        {
            src: 'https://mydownload.iaun.ac.ir/image/login/banner06.jpeg',
            alt: 'My University '
        }
    ];

    menu: Array<any> = [
        {
            Id: 1,
            Icon: "/assets/icon/uni-icon.png",
            URL: "/university",
            MenuType: MenuType.InnerLink,
            Title: this.baseService.translate('menu-list-item-AboutUni'),
            Disable: false
        },
        {
            Id: 2,
            Icon: "/assets/icon/uni-icon.png",
            URL: "https://iaun.iau.ir/",
            MenuType: MenuType.OuterLink,
            Title: 'IAUN',
            Disable: false
        },
        {
            Id: 3,
            Icon: "reader-outline",
            URL: "https://news.iaun.ac.ir/university/",
            MenuType: MenuType.OuterLink,
            Title: this.baseService.translate('home-news-header'),
            Disable: false
        },
        {
            Id: 4,
            Icon: "book-outline",
            URL: "https://edu.iau.ac.ir/",
            MenuType: MenuType.OuterLink,
            Title: this.baseService.translate('home-menu-Amoozeshyar'),
            Disable: false
        },
        {
            Id: 5,
            Icon: "flask-outline",
            URL: "https://ris.iau.ir/",
            MenuType: MenuType.OuterLink,
            Title: this.baseService.translate('home-menu-researchassistant'),
            Disable: false
        }
    ]
}
