import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { getBrowserLanguage } from './shared';

describe('AppComponent', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule, TranslateModule.forRoot()],
    });

    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeDefined();
  });

  it('should set default language on initialization', () => {
    const lang = getBrowserLanguage();
    jest.spyOn(translateService, 'setDefaultLang');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translateService.setDefaultLang).toHaveBeenCalledWith(lang);
  });
});
