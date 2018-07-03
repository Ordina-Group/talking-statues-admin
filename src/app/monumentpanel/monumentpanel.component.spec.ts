import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentpanelComponent } from './monumentpanel.component';

describe('MonumentpanelComponent', () => {
  let component: MonumentpanelComponent;
  let fixture: ComponentFixture<MonumentpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonumentpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
