export interface Product {
    url: string;   
    name: string;
    color: string;
    price: string;
    size: string;
}

export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isPositive: boolean;
}

export interface SearchTerm {
    searchValue: string;
    recommendText: string;
    expectedQuantity: number;
    isPositive: boolean;
}

export interface TestData {
    products: Product[];
    users: User[];
    searchTerms: SearchTerm[];
}
