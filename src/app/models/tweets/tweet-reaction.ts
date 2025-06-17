export interface TweetReaction {
  id?: number;
  userId: number;
  tweetId: number;
  reactionId: number;
  user?: User;
  tweet?: Tweet;
  reaction?: Reaction;
}

export interface User {
  id: number;
  username: string;
  // otros campos necesarios
}

export interface Tweet {
  id: number;
  content: string;
  // otros campos necesarios
}

export interface Reaction {
  id: number;
  type: string;
}