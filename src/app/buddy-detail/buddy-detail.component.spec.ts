import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyDetailComponent } from './buddy-detail.component';

describe('BuddyDetailComponent', () => {
  let component: BuddyDetailComponent;
  let fixture: ComponentFixture<BuddyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
