/* You can add functions to be exported in this file, so that they can be used for different components */

import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode, LoadOptions, SortByKeys, SortOrderKeys } from '..';

export function getLoadOptions(
  sortBy?: SortByKeys,
  sortOrder?: SortOrderKeys,
  titleFilter?: string,
  page = 1,
  limit = 10
): LoadOptions {
  return { sortBy, sortOrder, page, limit, titleFilter };
}

export function handleError(
  httpError: HttpErrorResponse,
  translateService: TranslateService
) {
  throw new Error(
    httpError.status === 404
      ? translateService.instant('ElementNotFound')
      : httpError.message
  );
}

export function saveToLocalStorage(key: string, value: string) {
  const now = new Date();
  const expiration = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  ).getTime(); // // End of today
  const data = { value, expiration };
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key: string): string | null {
  const storedData = localStorage.getItem(key);
  if (!storedData) return null;

  const { value, expiration } = JSON.parse(storedData);
  const now = new Date();
  if (now > expiration) {
    localStorage.removeItem(key);
    return null; // Expired
  }
  return value; // Valid
}

export function getBrowserLanguage(): string {
  const language = navigator.language;
  if (language.includes('en')) {
    return LanguageCode.enUS;
  } else if (language.includes('it')) {
    return LanguageCode.itIT;
  } else {
    return LanguageCode.enUS;
  }
}
