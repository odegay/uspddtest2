import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private http: HttpClient
  ) { }

  getTranslation(qId, lang) {
    return this.http.get('api/translation/' + qId + '/' + lang);
  }


}
