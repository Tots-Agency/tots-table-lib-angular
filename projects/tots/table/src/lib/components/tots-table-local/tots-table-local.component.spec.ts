import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotsTableLocalComponent } from './tots-table-local.component';

describe('TotsTableLocalComponent', () => {
  let component: TotsTableLocalComponent;
  let fixture: ComponentFixture<TotsTableLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotsTableLocalComponent]
    });
    fixture = TestBed.createComponent(TotsTableLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
