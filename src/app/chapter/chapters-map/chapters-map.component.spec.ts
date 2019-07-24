import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersMapComponent } from './chapters-map.component';

describe('ChaptersMapComponent', () => {
  let component: ChaptersMapComponent;
  let fixture: ComponentFixture<ChaptersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
