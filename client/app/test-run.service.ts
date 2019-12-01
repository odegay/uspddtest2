import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestRunService {

  constructor(
    private http: HttpClient
  ) { }

  testInit(testid) {
    return this.http.get('api/test/testinit/' + testid);
   }

   checkAnswer(qid, answid) {
    return this.http.get('api/test/checkAnswer/' + qid + '/' + answid);
   }

   getNextQuestion(tid, qIDs) {
    return this.http.get('api/test/getNextQuestion/' + tid + '/' + qIDs);
   }

   editInit() {
    return this.http.get('api/edit/initEdit');
   }

   deleteQuestion(questionId) {
    console.log(' deleteQuestion questionId = ' + questionId);
    return this.http.delete('api/edit/question/' + questionId);
   }

   saveQuestion(qId, curQuestion) {
    const data = {id: qId, question: curQuestion};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    if (qId.length > 0) {
      console.log(' saveQuestion data = ' + JSON.stringify(data));
      return this.http.put('api/edit/question/' + qId, data, httpOptions);
    } else {
      console.log(' saveQuestion data ERROR = ' + JSON.stringify(data));
    }
   }
}
