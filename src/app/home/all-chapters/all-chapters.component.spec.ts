import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChaptersComponent } from './all-chapters.component';

describe('AllChaptersComponent', () => {
  let component: AllChaptersComponent;
  let fixture: ComponentFixture<AllChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
