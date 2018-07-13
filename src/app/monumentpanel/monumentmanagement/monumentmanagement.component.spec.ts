import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentmanagementComponent } from './monumentmanagement.component';

describe('MonumentmanagementComponent', () => {
  let component: MonumentmanagementComponent;
  let fixture: ComponentFixture<MonumentmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonumentmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
