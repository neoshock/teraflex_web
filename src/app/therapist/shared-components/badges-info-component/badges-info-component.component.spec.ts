import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesInfoComponentComponent } from './badges-info-component.component';

describe('BadgesInfoComponentComponent', () => {
  let component: BadgesInfoComponentComponent;
  let fixture: ComponentFixture<BadgesInfoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesInfoComponentComponent]
    });
    fixture = TestBed.createComponent(BadgesInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
