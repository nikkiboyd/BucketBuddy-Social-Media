import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualBucketItemsComponent } from './mutual-bucket-items.component';

describe('MutualBucketItemsComponent', () => {
  let component: MutualBucketItemsComponent;
  let fixture: ComponentFixture<MutualBucketItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutualBucketItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualBucketItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
