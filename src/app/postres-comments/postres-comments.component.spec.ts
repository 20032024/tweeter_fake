import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostresCommentsComponent } from './postres-comments.component';

describe('PostresCommentsComponent', () => {
  let component: PostresCommentsComponent;
  let fixture: ComponentFixture<PostresCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostresCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostresCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
