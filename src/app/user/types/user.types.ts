

export interface HomeProduct {
  name: string,
  price: number,
  brand: any
}

export interface filter {
  brand: string,
  category: string,
  gears: string,
  brake_type: string,
  suspension: String
}

export interface rent {
  _id: string,
  name: string,
  price: number,
  cycle_Details: string,
  location: string,
  owner: any,
  image: any,
  bookedDate: any
}

export interface bicycle {
  name: string,
  brand: brand,
  category: category,
  price: number,
  stock: number,
  gears: boolean,
  brake_type: boolean,
  suspension: boolean,
  cycle_Details: string,
  image: any,
  wished: boolean,
  _id: string,
}

export interface productDetails {
  total: number,
  Total: number,
  obj: object,
  product: bicycle
}

export interface brand {
  Brand_name: string,
  _id: string,
}

export interface category {
  category_name: string,
  _id: string
}

export interface cart {
  _id: string,
  user: any,
  product: cartProduct[],
  TotalAmount: number
}
export interface cartProduct {
  id: any,
  _id: string,
  count: number
}

export interface user {
  _id: string,
  name: string,
  email: string,
  phone: number,
  walletHistory: wallet[],
  isBlocked: Boolean,
  isVerified: Boolean
}

export interface order {
  _id: string,
  user: any,
  product: orderProduct[]
}

export interface orderProduct {
  id: any,
  _id: string,
  count: number,
  DeliveryDate: Date,
  status: string
}
export interface review {
  _id: string,
  user: any,
  product: any,
  ratings_review: ratings_review[],

}

export interface ratings_review {
  ratings: number,
  review: string
}
export interface wallet {
  date: Date,
  amount: number,
  description: string
}

export interface wishlist {
  _id: string,
  user: string,
  product: wishProduct[]
}
export interface wishProduct {
  id: any,
  _id: string
}
export interface address {
  _id?: string,
  city: string,
  country: string,
  district: string,
  fname: string,
  housename: string,
  lname: string,
  mobile: number,
  pin: number
  state: string,
  email: string,
  __v?:any
}

export interface rentorderDetails {
  user: any,
  Date: any,
  owner: any,
  razorId: any,
  paymentMethod: string,
  totalAmount: number
}
export interface datePickerT {
  start: Date,
  end: Date,
  location: string
}
export interface ChatData {
  receiverType: string
  senderType: string
  text: string
  receiver: string
  serviceName: string
  companyName: string
}
export interface Data {
  _id: string;
  users: string[];
  userRead: boolean;
  professionalRead: boolean;
  messages: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IServicerDetailsResponse {
  servicesFind: {
    _id: string;
    companyName: string;
    email: string;
    phone: number;
  };
  wallet: number | undefined;
}