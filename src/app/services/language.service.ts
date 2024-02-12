import { Injectable } from '@angular/core';
import enLanguage from 'src/assets/languages/en.json';
import faLanguage from 'src/assets/languages/fa.json';
import arLanguage from 'src/assets/languages/ar.json';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public Languages = {
    fa: new LanguageModel('fa', 'فارسی', 'dana', 'rtl'),
    ar: new LanguageModel('ar', 'العربية', 'notoSansArabic', 'rtl'),
    en: new LanguageModel('en', 'English', 'openSans', 'ltr')
  };
  private Dictionary: any;
  private setupDictionary(language: LanguageModel) {
    if (language) {
      switch (language.Symbol) {
        case 'fa':
          this.Dictionary = faLanguage;
          break;
        case 'ar':
          this.Dictionary = arLanguage;
          break;
        case 'en':
          this.Dictionary = enLanguage;
          break;
      }
    }
  }

  constructor(private storageService: StorageService) {
    // Setup default language 
    if (!this.Language()) { this.Language_Change(this.Languages.fa); }
    if (!this.Dictionary) { this.setupDictionary(this.Language()) }
  }


  Language() { return this.storageService.Language; }
  Language_Change(language: LanguageModel) {
    if (language) {
      this.setupDictionary(language);
      this.storageService.Language = language;
      document.getElementsByTagName('body')[0].style.setProperty('direction', language.Direction);
      let r: any = document.getElementsByTagName('body')[0];
      // let r: any = document.querySelector(':root');
    
      if(language.Symbol==='en') {
        r.style.setProperty('--ion-font-family', language.Font);
        r.style.setProperty('font-family', language.Font);
      }
      else if(language.Symbol==='fa') {
        r.style.setProperty('--ion-font-family', language.Font);
        r.style.setProperty('font-family', language.Font);
      }
      if(language.Symbol==='ar') {
        r.style.setProperty('--ion-font-family', language.Font);
        r.style.setProperty('font-family', language.Font);
      }
    }
  }

  Translate(key: string): string { return this.Dictionary[key]; }
}

export class LanguageModel {
  constructor(symbol: string, caption: string, font: string, direction: 'rtl' | 'ltr' = 'ltr') {
    this.Symbol = symbol;
    this.Caption = caption;
    this.Font = font;
    this.Direction = direction;
  }

  Symbol: string = '';
  Caption: string = '';
  Font: string = '';
  Direction: 'rtl' | 'ltr';
}