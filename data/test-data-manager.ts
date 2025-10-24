import { TestData, User, Product, SearchTerm } from '@data/type';
import testData from '@data/test-data.json';

export default class TestDataManager {
    private data: TestData;

    constructor() {
        // Type assertion to ensure the JSON data matches our interfaces
        this.data = testData as TestData;
    }

    // User related methods
    public getUser(index: number): User {
        if (index >= this.data.users.length) {
            throw new Error(`User index ${index} is out of bounds`);
        }
        return this.data.users[index];
    }

    public getAllUsers(): User[] {
        return this.data.users;
    }

    // Product related methods
    public getProduct(index: number): Product {
        if (index >= this.data.products.length) {
            throw new Error(`Product index ${index} is out of bounds`);
        }
        return this.data.products[index];
    }

    public getAllProducts(): Product[] {
        return this.data.products;
    }

    public getProductByName(name: string): Product | undefined {
        return this.data.products.find(product => product.name === name);
    }

    // Search related methods
    public getSearchTerm(index: number): SearchTerm {
        if (index >= this.data.searchTerms.length) {
            throw new Error(`SearchTerm index ${index} is out of bounds`);
        }
        return this.data.searchTerms[index];
    }

    public getAllSearchTerms(): SearchTerm[] {
        return this.data.searchTerms;
    }

    // Utility methods
    public getRandomProduct(): Product {
        const randomIndex = Math.floor(Math.random() * this.data.products.length);
        return this.data.products[randomIndex];
    }

    public getRandomUser(): User {
        const randomIndex = Math.floor(Math.random() * this.data.users.length);
        return this.data.users[randomIndex];
    }
}