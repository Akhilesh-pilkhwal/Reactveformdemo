export interface Icustomer {
    name: string;
    addresses: Address[];
}

export interface Address {
    street: string;
    postcode: string;
}
