import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListBuddyComponent } from './bucket-list-buddy.component';

describe('BucketListBuddyComponent', () => {
  let component: BucketListBuddyComponent;
  let fixture: ComponentFixture<BucketListBuddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketListBuddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketListBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
