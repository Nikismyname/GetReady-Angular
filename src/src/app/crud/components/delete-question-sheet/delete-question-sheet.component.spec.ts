import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionSheetComponent } from './delete-question-sheet.component';

describe('DeleteQuestionSheetComponent', () => {
  let component: DeleteQuestionSheetComponent;
  let fixture: ComponentFixture<DeleteQuestionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuestionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuestionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
