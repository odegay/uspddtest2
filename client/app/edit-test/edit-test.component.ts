import { Component, OnInit, TemplateRef  } from '@angular/core';
import { TestRunService } from '../test-run.service';
import { Question } from '../question';
// test modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ɵDomAdapter } from '@angular/platform-browser';
// test modal


@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  curQuestion;
  questions = [];
  testid = '1';
  questionAction = '';
  // test modal
  modalRef: BsModalRef;
  // test modal
  constructor(
    private apiService: TestRunService,
// test modal
    private modalService: BsModalService
// test modal
  ) { }

  openModal(template: TemplateRef<any>, questionId) {
// HERE IS A MISTAKE ID != INDEX
// FOR A SAKE OF TIME USING COSTYL
    this.curQuestion = new Question(this.questions[questionId - 1]);
    if (parseInt(questionId, 10) > 0) {
      this.questionAction = 'Edit question';
    } else {
      this.questionAction = 'New question';
      this.curQuestion.question = 'QUESTION';
      this.curQuestion.answers = [
        {id: '1', answer: 'answer1'},
        {id: '2', answer: 'answer2'},
        {id: '3', answer: 'answer3'},
        {id: '4', answer: 'answer4'}
      ];
      this.questions.push(this.curQuestion);
      // FIX this should be fixxed for sure!!!
      this.curQuestion.id = this.questions.length.toString(10);
      this.curQuestion.rightanswer = '0';
      this.curQuestion.userAnswerId = '0';
      this.curQuestion.isSubmitted = false;
    }

    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }

  ngOnInit() {
    if (this.questions.length === 0) {
      this.editInit();
    }
  }
// FIX!!! Mistakes processing
  editInit() {
    this.apiService.editInit()
    .subscribe((data: any) => {
      this.questions = data.data;
    });
  }

  deleteQuestion(questionId) {
    const confResp = confirm('Are you sure you want to delete this question?')
    if (confResp) {
      this.apiService.deleteQuestion(questionId)
      .subscribe((data: any) => {
        if (!data.isError) {
          const elIndex = this.questions.findIndex(question => question.id == questionId);
          this.questions.splice(elIndex, 1);
        }
        console.log('edit-test.component.ts deleteQuestion: ' + JSON.stringify(data));
      });
    } else {
      return;
    }
  }

  saveForm() {
    const questionEl = document.getElementById('question' + this.curQuestion.id) as HTMLInputElement;
    this.curQuestion.question = questionEl.value;
    this.curQuestion.answers.forEach(answer => {
      const answerEl = document.getElementById('answer' + answer.id) as HTMLInputElement;
      const radioSearchStr = 'answerq' + this.curQuestion.id + 'a' + answer.id + 'L';
      const answerElRadio = document.getElementById(radioSearchStr) as HTMLInputElement;
      answer.answer = answerEl.value;
      if (answerElRadio.checked) {
        this.curQuestion.rightanswer = answer.id;
      }
     });
     console.log('edit-test.component.ts curQuestion: ' + JSON.stringify(this.curQuestion));
     // this.curQuestion.question =
    this.apiService.saveQuestion(this.curQuestion.id, this.curQuestion)
    .subscribe((data: any) => {
      console.log('edit-test.component.ts EditTestComponent: saveForm data: ' + JSON.stringify(data));
    });

    const elIndex = this.questions.findIndex(question => question.id == this.curQuestion.id);
    this.questions[elIndex] = this.curQuestion;
    this.modalRef.hide();
  }
}
