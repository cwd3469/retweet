export interface User {
  userId: string;
  nickName: string;
  userEmail: string;
  profileImg: string;
}

export interface Tweet extends User {
  createDate: string;
  contents: {
    text: Array<string>;
    image: string;
  };
  timestamp?: Date;
} 

export interface TweetList extends Tweet {
  id?: string;
}
