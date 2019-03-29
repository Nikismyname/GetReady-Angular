import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGlobalQuestionComponent } from './view-global-question.component';

describe('ViewGlobalQuestionComponent', () => {
  let component: ViewGlobalQuestionComponent;
  let fixture: ComponentFixture<ViewGlobalQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGlobalQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGlobalQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
