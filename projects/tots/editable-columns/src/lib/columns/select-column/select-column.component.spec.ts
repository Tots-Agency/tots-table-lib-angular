import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputColumn } from './input-column.component';

describe('InputColumnComponent', () => {
  let component: InputColumn;
  let fixture: ComponentFixture<InputColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputColumn ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
