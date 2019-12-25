import { Component, OnInit } from '@angular/core';
import { TestRunService } from '../test-run.service';
import { Question } from '../question';
import { Translation, LanguageEntity } from '../translation';

@Component({
  selector: 'app-nj-test',
  templateUrl: './nj-test.component.html',
  styleUrls: ['./nj-test.component.css']
})
export class NjTestComponent implements OnInit {

  questions = [];
  score = 0;
  wrongAns = 0;
  skipped = 0;
  useroptions = [];
  testid = 1; // remove!!!!!!!!!!!
  questionIDs = [];
  curQuestion;
  currentPage = 0;
  pageSize = 0;
  translation;
  // langSelectedId = 0;
  uid = '';

  constructor(
    private apiService: TestRunService
  ) { }


  cntRightAnswers = () => (this.questions.filter((obj) => (obj.isRightAnswer() && obj.isSubmitted)).length);
  cntWrongAnswers = () => (this.questions.filter((obj) => (!obj.isRightAnswer() && obj.isSubmitted)).length);

  testInit() {
    // console.log
    // Initializing test
    this.apiService.testInit(this.testid)
      .subscribe((data: any) => {
//        console.log('nj-test.component.ts NjTestComponent: testInit RESPONSE: ' + JSON.stringify(data));
        // FIX!!! THIS SHOULD BE IMPROVED
        this.pageSize = data.data.result.questions.length;
        this.uid =  data.data.uid;
        // FIX!!! THIS SHOULD BE IMPROVED
        // let live = this;
        console.log('nj-test.component.ts NjTestComponent: testInit this.length = ' + this.pageSize + ' ' + ' this.uid = ' + this.uid);
      });
  }

  getNextQuestion() {
//    console.log('nj-test.component.ts NjTestComponent: getNextQuestion this.questionIDs: ' + JSON.stringify(this.questionIDs));
    // tslint:disable-next-line: max-line-length
//    console.log('nj-test.component.ts NjTestComponent: getNextQuestion this.currentPage: ' + JSON.stringify(this.currentPage) + ' this.questions.length = ' + this.questions.length);

    if (this.currentPage === this.questions.length) {
      this.apiService.getNextQuestion(this.testid, JSON.stringify(this.questionIDs))
        .subscribe((data: any) => {
//          console.log('nj-test.component.ts NjTestComponent: getNextQuestion RESPONSE: ' + JSON.stringify(data));
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
            this.changeLang();
          }
        });
    } else {
      this.currentPage++;
      this.curQuestion = this.questions[this.currentPage - 1];
      this.changeLang();
    }
  }

  getPrevQuestion() {
//    console.log('nj-test.component getPrevQuestion: before currentPage = ' + this.currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
      this.curQuestion = this.questions[this.currentPage - 1];
      this.changeLang();
      // tslint:disable-next-line: max-line-length
      // console.log('nj-test.component getPrevQuestion: currentPage = ' + this.currentPage + ' this.curQuestion = ' + JSON.stringify(this.curQuestion));
      // console.log('nj-test.component getPrevQuestion: questions = ' + JSON.stringify(this.questions));
    } else {
//      console.log('nj-test.component getPrevQuestion: ERROR: Got into function when shouldn\'t because in the very beginning of the list');
    }

    // console.log('prevQuestion: live.currentPage = ' + live.currentPage);
    // console.log('prevQuestion: live.curQuestion = ' + JSON.stringify(live.curQuestion));
  }

  answerChosen(answerId) {
    this.curQuestion.userAnswerId = answerId;
//    console.log('answerChosen: received answ ID = ' + answerId + ' saved answId = ' + this.curQuestion.userAnswerId);
  }

  submitQuestion() {
    this.curQuestion.isSubmitted = true;
  }

  getCurAnswerbyId = (answId) => this.curQuestion.answers.find((el) => parseInt(el.id, 10) === parseInt(answId, 10));

  changeLang() {
    this.translation = null;
    const langSelection = document.getElementById('transLangSelector') as HTMLSelectElement;
    if (!langSelection) return;
    const langSelectedId = langSelection.options[langSelection.selectedIndex].id;

    // DEBUG Loading translation
    // This should be optimized because no cache in use here
    if (langSelectedId !== 'eng') {
      // this.curQuestion.id
      this.apiService.getTranslation(this.curQuestion.id, langSelectedId)
      .subscribe((data: any) => {
        if (data.isError) {
          console.log('nj-test.component.ts NjTestComponent: changeLang: Translation for qId = ' + this.curQuestion.id + ' and lang = ' + langSelectedId + ' RESULTS TO ERROR respones = ' + JSON.stringify(data));
        } else if (data.response === '204') {
          console.log('nj-test.component.ts NjTestComponent: changeLang: Translation for qId = ' + this.curQuestion.id + ' and lang = ' + langSelectedId + ' NOT FOUND respones = ' + JSON.stringify(data));
        } else {
          this.translation = data.data;
          console.log('nj-test.component.ts NjTestComponent: testInit getTranslation: ' + JSON.stringify(data));
          console.log('nj-test.component.ts NjTestComponent: testInit this.translation ' + JSON.stringify(this.translation));
          console.log('nj-test.component.ts NjTestComponent: testInit this.translation.langid ' + JSON.stringify(this.translation.langid));
        }
      });
    }
  }

  ngOnInit() {
    this.testInit();
    this.getNextQuestion();
  }

}
