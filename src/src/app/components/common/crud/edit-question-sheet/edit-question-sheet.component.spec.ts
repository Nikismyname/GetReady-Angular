import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionSheetComponent } from './edit-question-sheet.component';

describe('EditQuestionSheetComponent', () => {
  let component: EditQuestionSheetComponent;
  let fixture: ComponentFixture<EditQuestionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
