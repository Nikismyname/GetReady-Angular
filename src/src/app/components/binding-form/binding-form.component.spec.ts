import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingFormComponent } from './binding-form.component';

describe('BindingFormComponent', () => {
  let component: BindingFormComponent;
  let fixture: ComponentFixture<BindingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
