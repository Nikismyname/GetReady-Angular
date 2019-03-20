import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSheetComponent } from './personal-sheet.component';

describe('PersonalSheetComponent', () => {
  let component: PersonalSheetComponent;
  let fixture: ComponentFixture<PersonalSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
