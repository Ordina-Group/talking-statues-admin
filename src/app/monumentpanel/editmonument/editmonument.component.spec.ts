import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmonumentComponent } from './editmonument.component';

describe('EditmonumentComponent', () => {
  let component: EditmonumentComponent;
  let fixture: ComponentFixture<EditmonumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmonumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
