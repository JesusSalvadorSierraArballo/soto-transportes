export interface LoginResponse {
  accessToken:  string;
  refreshToken: string;
  id:           number;
  username:     string;
  email:        string;
  firstName:    string;
  lastName:     string;
  gender:       string;
  image:        string;
}


export interface GetAllPostResponse {
  posts: Post[];
  total: number;
  skip:  number;
  limit: number;
}

export interface Post {
  id:        number;
  title:     string;
  body:      string;
  tags:      string[];
  reactions: Reactions;
  views:     number;
  userId:    number;
}

export interface Reactions {
  likes:    number;
  dislikes: number;
}


export interface GetSingleUserResponse {
  id:         number;
  firstName:  string;
  lastName:   string;
  maidenName: string;
  age:        number;
  gender:     string;
  email:      string;
  phone:      string;
  username:   string;
  password:   string;
  birthDate:  string;
  image:      string;
  bloodGroup: string;
  height:     number;
  weight:     number;
  eyeColor:   string;
  hair:       Hair;
  ip:         string;
  address:    Address;
  macAddress: string;
  university: string;
  bank:       Bank;
  company:    Company;
  ein:        string;
  ssn:        string;
  userAgent:  string;
  crypto:     Crypto;
  role:       string;
}

export interface Address {
  address:     string;
  city:        string;
  state:       string;
  stateCode:   string;
  postalCode:  string;
  coordinates: Coordinates;
  country:     string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType:   string;
  currency:   string;
  iban:       string;
}

export interface Company {
  department: string;
  name:       string;
  title:      string;
  address:    Address;
}

export interface Crypto {
  coin:    string;
  wallet:  string;
  network: string;
}

export interface Hair {
  color: string;
  type:  string;
}

export interface UserBasicInfo {
  id: number;
  firstName: string;
  lastName: string;
}

export interface PostDeleteResponse {
  id:        number;
  title:     string;
  body:      string;
  tags:      string[];
  reactions: Reactions;
  views:     number;
  userId:    number;
  isDeleted: boolean;
  deletedOn: Date;
}

export interface Reactions {
  likes:    number;
  dislikes: number;
}

export interface PostPutResponse {
  id:        number;
  title:     string;
  body:      string;
  userId:    number;
  tags:      string[];
  reactions: Reactions;
}

export interface Reactions {
  likes:    number;
  dislikes: number;
}

export interface PostFormProps {
  postId: number;
  title:     string;
  body:      string;
  userId:    number;
  tags:      string;
  onUpdate?: (s: PostPutResponse) => void;
  onNew?: (s: PostPutResponse) => void;
}
export interface PostPostResponse {
  id: number;
  title:  string;
  body:   string;
  userId: number;
  tags:   string[];
}
