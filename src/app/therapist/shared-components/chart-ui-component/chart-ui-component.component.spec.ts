import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUiComponentComponent } from './chart-ui-component.component';

describe('ChartUiComponentComponent', () => {
  let component: ChartUiComponentComponent;
  let fixture: ComponentFixture<ChartUiComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartUiComponentComponent]
    });
    fixture = TestBed.createComponent(ChartUiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
