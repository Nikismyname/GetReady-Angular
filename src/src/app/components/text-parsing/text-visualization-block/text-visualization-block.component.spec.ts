import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextVisualizationBlockComponent } from './text-visualization-block.component';

describe('TextVisualizationBlockComponent', () => {
  let component: TextVisualizationBlockComponent;
  let fixture: ComponentFixture<TextVisualizationBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextVisualizationBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVisualizationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
