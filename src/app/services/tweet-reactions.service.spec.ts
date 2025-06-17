import { TestBed } from '@angular/core/testing';

import { TweetReactionsService } from './tweet-reactions.service';

describe('TweetReactionsService', () => {
  let service: TweetReactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetReactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
