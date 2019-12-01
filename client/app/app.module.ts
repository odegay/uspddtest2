import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { NjTestComponent } from './nj-test/nj-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { QuestionEditModalComponent } from './question-edit-modal/question-edit-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes: Routes = [
  { path: '',
    component: StartingPageComponent
  },
  { path: 'njdmvtest', component: NjTestComponent },
  { path: 'edittest', component: EditTestComponent },
  { path: '**', component: StartingPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartingPageComponent,
    NjTestComponent,
    EditTestComponent,
    QuestionEditModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
