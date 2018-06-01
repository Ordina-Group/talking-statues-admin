import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentDialogComponent } from './monument-dialog.component';

describe('MonumentDialogComponent', () => {
  let component: MonumentDialogComponent;
  let fixture: ComponentFixture<MonumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonumentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
