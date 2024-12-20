import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  getBrowserLanguage,
  getFromLocalStorage,
  getLoadOptions,
  handleError,
  saveToLocalStorage,
} from '.';
import { LanguageCode, SortByKeys, SortOrderKeys } from '..';

describe('helpers', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });

    translateService = TestBed.inject(TranslateService);
  });

  describe('getLoadOptions', () => {
    it('should get load options with default values', () => {
      const loadOptions = getLoadOptions();
      expect(loadOptions).toEqual({
        sortBy: undefined,
        sortOrder: undefined,
        titleFilter: undefined,
        page: 1,
        limit: 10,
      });
    });

    it('should get load options', () => {
      const loadOptions = getLoadOptions(
        SortByKeys.title,
        SortOrderKeys.DESC,
        'test'
      );
      expect(loadOptions).toEqual({
        sortBy: 'title',
        sortOrder: 'DESC',
        titleFilter: 'test',
        page: 1,
        limit: 10,
      });
    });
  });

  describe('handleError', () => {
    it('should throw error', () => {
      const httpError = new HttpErrorResponse({
        status: 404,
      });
      expect(() => handleError(httpError, translateService)).toThrow(
        'ElementNotFound'
      );
    });

    it('should throw error', () => {
      const statusText = 'check text';
      const httpError = new HttpErrorResponse({
        status: 500,
        statusText,
      });
      expect(() => handleError(httpError, translateService)).toThrow(
        'Http failure response for (unknown url): 500 ' + statusText
      );
    });
  });

  describe('local storage', () => {
    it('should return null if no data is stored', () => {
      const key = 'test';
      const storedData = getFromLocalStorage(key);
      expect(storedData).toBeNull();
    });

    it('should save to local storage', () => {
      const key = 'test';
      const value = 'testing';
      saveToLocalStorage(key, value);
      const storedData = localStorage.getItem(key);
      expect(storedData).not.toBeNull();
    });

    it('should get from local storage', () => {
      const key = 'test';
      const value = 'testing';
      saveToLocalStorage(key, value);
      const storedData = getFromLocalStorage(key);
      expect(storedData).toBe(value);
    });
  });

  describe('getBrowserLanguage', () => {
    it('should get browser language', () => {
      Object.defineProperty(navigator, 'language', {
        get: jest.fn(() => LanguageCode.enUS),
      });
      const lang = getBrowserLanguage();
      expect(lang).toBe(LanguageCode.enUS);
    });
  });
});
