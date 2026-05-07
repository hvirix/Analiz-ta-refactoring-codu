export class Product {
    constructor(name, price) { this.name = name; this.price = price; }
    getPrice() { return this.price; }
    getDescription() { return this.name; }
}

export class WarrantyDecorator {
    constructor(product) { this.product = product; }
    getPrice() { return this.product.getPrice() + 500; }
    getDescription() { return this.product.getDescription() + " (+ 1 рік гарантії)"; }
}