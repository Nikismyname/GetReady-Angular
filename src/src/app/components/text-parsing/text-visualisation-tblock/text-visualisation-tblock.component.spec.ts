import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextVisualisationTBlockComponent } from './text-visualisation-tblock.component';

describe('TextVisualisationRecursionComponent', () => {
  let component: TextVisualisationTBlockComponent;
  let fixture: ComponentFixture<TextVisualisationTBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextVisualisationTBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVisualisationTBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
