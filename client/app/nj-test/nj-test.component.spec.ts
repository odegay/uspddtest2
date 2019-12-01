import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjTestComponent } from './nj-test.component';

describe('NjTestComponent', () => {
  let component: NjTestComponent;
  let fixture: ComponentFixture<NjTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
