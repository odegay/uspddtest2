import { Component, OnInit } from '@angular/core';
import { TestRunService } from '../test-run.service';
import { Question } from '../question';

@Component({
  selector: 'app-nj-test',
  templateUrl: './nj-test.component.html',
  styleUrls: ['./nj-test.component.css']
})
export class NjTestComponent implements OnInit {

  constructor(
    private apiService: TestRunService
  ) { }
  score = 0;
  wrongAns = 0;
  skipped = 0;
  useroptions = [];
  testid = 1; // remove!!!!!!!!!!!
   questions = [];
  questionIDs = [];
  curQuestion;
  currentPage = 0;
  pageSize = 0;
  // email = '1111';
  uid = '';

  cntRightAnswers = () => (this.questions.filter((obj) => (obj.isRightAnswer() && obj.isSubmitted)).length);
  cntWrongAnswers = () => (this.questions.filter((obj) => (!obj.isRightAnswer() && obj.isSubmitted)).length);

  testInit() {
    // console.log
    this.apiService.testInit(this.testid)
      .subscribe((data: any) => {
        console.log('nj-test.component.ts NjTestComponent: testInit RESPONSE: ' + JSON.stringify(data));
        // FIX!!! THIS SHOULD BE IMPROVED
        this.pageSize = data.data.result.questions.length;
        this.uid =  data.data.uid;
        // FIX!!! THIS SHOULD BE IMPROVED
        // let live = this;
        console.log('nj-test.component.ts NjTestComponent: testInit this.length = ' + this.pageSize + ' ' + ' this.uid = ' + this.uid);
      });
  }

  getNextQuestion() {
    console.log('nj-test.component.ts NjTestComponent: getNextQuestion this.questionIDs: ' + JSON.stringify(this.questionIDs));
    // tslint:disable-next-line: max-line-length
    console.log('nj-test.component.ts NjTestComponent: getNextQuestion this.currentPage: ' + JSON.stringify(this.currentPage) + ' this.questions.length = ' + this.questions.length);

    if (this.currentPage === this.questions.length) {
      this.apiService.getNextQuestion(this.testid, JSON.stringify(this.questionIDs))
        .subscribe((data: any) => {
          console.log('nj-test.component.ts NjTestComponent: getNextQuestion RESPONSE: ' + JSON.stringify(data));
          if (!data.isError) {
            // FIX!!! Errors processing
            if (data.response === '204') {
              return;
            }
            const tmpQuestion = new Question(data.data);
            this.curQuestion = tmpQuestion;
            this.questions.push(tmpQuestion);
            this.questionIDs.push(data.data.id);
            this.currentPage++;
          }
        });
    } else {
      this.currentPage++;
      this.curQuestion = this.questions[this.currentPage - 1];
      if (this.curQuestion.isSubmitted) {
        this.applyAnswerStyling();
       }
    }
  }

  getPrevQuestion() {
    console.log('nj-test.component getPrevQuestion: before currentPage = ' + this.currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
      this.curQuestion = this.questions[this.currentPage - 1];
      if (this.curQuestion.isSubmitted) {
        this.applyAnswerStyling();
      }
      // tslint:disable-next-line: max-line-length
      console.log('nj-test.component getPrevQuestion: currentPage = ' + this.currentPage + ' this.curQuestion = ' + JSON.stringify(this.curQuestion));
      console.log('nj-test.component getPrevQuestion: questions = ' + JSON.stringify(this.questions));
    } else {
      console.log('nj-test.component getPrevQuestion: ERROR: Got into function when shouldn\'t because in the very beginning of the list');
    }

    // console.log('prevQuestion: live.currentPage = ' + live.currentPage);
    // console.log('prevQuestion: live.curQuestion = ' + JSON.stringify(live.curQuestion));
  }

  answerChosen(answerId) {
    this.curQuestion.userAnswerId = answerId;
    console.log('answerChosen: received answ ID = ' + answerId + ' saved answId = ' + this.curQuestion.userAnswerId);
  }

  applyAnswerStyling() {
    return;
    // FIX!!! Should be refactored and moved to HTML part not in JS (probably)
    if (this.curQuestion.isSubmitted) {
      console.log('applyAnswerStyling: answer id = ' + 'answerq' + this.curQuestion.id + 'a' + this.curQuestion.rightAnswer);
      const answHTMLElement = document.getElementById('answerq' + this.curQuestion.id + 'a' + this.curQuestion.rightAnswer);
      console.log('applyAnswerStyling: answHTMLElement.innerHTML = ' + answHTMLElement.innerHTML);
      answHTMLElement.className = answHTMLElement.className + ' ' + 'radio-correct';
      if (!this.curQuestion.isRightAnswer()) {
        const wrongHTMLElement = document.getElementById('answerq' + this.curQuestion.id + 'a' + this.curQuestion.userAnswerId);
        wrongHTMLElement.className = answHTMLElement.className + ' ' + 'radio-wrong';
      }
    } else {
      console.log('WARNING: applyAnswerStyling: calling answer styling for a non-submitted question');
      }
  }


  submitQuestion() {
    this.curQuestion.isSubmitted = true;
    this.applyAnswerStyling();
  }

  getCurAnswerbyId = (answId) => this.curQuestion.answers.find((el) => parseInt(el.id, 10) === parseInt(answId, 10));

  ngOnInit() {
    this.testInit();
    this.getNextQuestion();
  }

}
