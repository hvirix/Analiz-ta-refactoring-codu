export class PaymentStrategy {
    pay(amount) { throw new Error("Method pay() must be implemented"); }
}

export class CardPayment extends PaymentStrategy {
    pay(amount) { console.log(`Оплачено ${amount} грн за допомогою банківської картки.`); }
}

export class PayPalPayment extends PaymentStrategy {
    pay(amount) { console.log(`Оплачено ${amount} грн через PayPal.`); }
}

export class Order {
    constructor(customer, product) {
        this.customer = customer;
        this.product = product;
        this.strategy = null;
    }

    setPaymentStrategy(strategy) {
        this.strategy = strategy;
    }

    checkout() {
        const total = this.product.getPrice();
        console.log(`Замовлення для ${this.customer.name}: ${this.product.getDescription()}`);
        this.strategy.pay(total);
    }
}