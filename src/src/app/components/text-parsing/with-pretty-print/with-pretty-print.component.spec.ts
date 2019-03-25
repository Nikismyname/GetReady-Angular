import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithPrettyPrintComponent } from './with-pretty-print.component';

describe('WithPrettyPrintComponent', () => {
  let component: WithPrettyPrintComponent;
  let fixture: ComponentFixture<WithPrettyPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithPrettyPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithPrettyPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
