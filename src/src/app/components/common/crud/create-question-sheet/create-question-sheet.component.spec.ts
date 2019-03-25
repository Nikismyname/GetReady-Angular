import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionSheetComponent } from './create-question-sheet.component';

describe('CreateQuestionSheetComponent', () => {
  let component: CreateQuestionSheetComponent;
  let fixture: ComponentFixture<CreateQuestionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
