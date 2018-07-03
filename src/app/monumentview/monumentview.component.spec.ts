import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentviewComponent } from './monumentview.component';

describe('MonumentviewComponent', () => {
  let component: MonumentviewComponent;
  let fixture: ComponentFixture<MonumentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonumentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
