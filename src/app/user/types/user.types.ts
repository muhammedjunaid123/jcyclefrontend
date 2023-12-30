export interface Product {
    name: string,
    brand: string,
    category: string,
    price: number,
    stock: number,
    gears: boolean,
    brake_type: boolean,
    suspension: boolean,
    cycle_Details: boolean,
    image: string[],
    wished: boolean
}

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

 