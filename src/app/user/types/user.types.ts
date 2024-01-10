

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
  name: string,
  price: number,
  cycle_Details: string,
  location: string,
  owner: string,
  image: any
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
export interface address{
city:string,
country:string,
district:string, 
fname:string,
housename:string,
lname:string,
mobile:number,
pin:number 
state:string,
email:string
}