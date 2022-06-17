export interface User {
  userId: string;
  nickName: string;
  userEmail: string;
  profileImg: string;
}

export interface Tweet extends User {
  createDate: string;
  timestamp?: Date;
  id?: string;
  contents: {
    text: Array<string>;
    image: string;
  };

} 


