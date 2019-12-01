import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.css']
})
export class QuestionEditModalComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

}
