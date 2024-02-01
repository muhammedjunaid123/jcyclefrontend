export interface adminBrand {
    Brand_name: string,
    _id: string,
    isBlocked: boolean
}

export interface adminCategory {
    category_name: string,
    _id: string,
    isBlocked: boolean
}
export enum AdminStatus {
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'return'
}
export interface Adminorder{
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
  export interface AdminUser {
    _id: string,
    name: string,
    email: string,
    phone: number,
    isBlocked:Boolean,
    isVerified:Boolean
  }