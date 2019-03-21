import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextVisualizationInlineComponent } from './text-visualization-inline.component';

describe('TextVisualizationInlineComponent', () => {
  let component: TextVisualizationInlineComponent;
  let fixture: ComponentFixture<TextVisualizationInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextVisualizationInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVisualizationInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
