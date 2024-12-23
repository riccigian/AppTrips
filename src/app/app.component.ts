import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getBrowserLanguage } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(getBrowserLanguage());
  }
}
