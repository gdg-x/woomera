import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyChaptersComponent } from './nearby-chapters.component';

describe('NearbyChaptersComponent', () => {
  let component: NearbyChaptersComponent;
  let fixture: ComponentFixture<NearbyChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
