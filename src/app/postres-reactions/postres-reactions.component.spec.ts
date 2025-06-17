import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostresReactionsComponent } from './postres-reactions.component';

describe('PostresReactionsComponent', () => {
  let component: PostresReactionsComponent;
  let fixture: ComponentFixture<PostresReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostresReactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostresReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
