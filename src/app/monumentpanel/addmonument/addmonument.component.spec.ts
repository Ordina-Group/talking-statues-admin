import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmonumentComponent } from './addmonument.component';

describe('AddmonumentComponent', () => {
  let component: AddmonumentComponent;
  let fixture: ComponentFixture<AddmonumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmonumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
