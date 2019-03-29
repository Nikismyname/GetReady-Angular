import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderRecursionComponent } from './folder-recursion.component';

describe('FolderRecursionComponent', () => {
  let component: FolderRecursionComponent;
  let fixture: ComponentFixture<FolderRecursionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderRecursionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderRecursionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
