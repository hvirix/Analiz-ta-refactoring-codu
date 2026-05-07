// index.js
// 1. Правильні імпорти (без дублювання)
import { UserFactory } from './models/User.js';
import { Product, WarrantyDecorator } from './models/Product.js';
import { Order, CardPayment } from './models/Order.js';

// 2. Створюємо покупця через Фабрику (Патерн Factory Method)
const client = UserFactory.createUser('Customer', 'Іван', 'ivan@mail.com', 'Київ');
console.log(`Створено користувача: ${client.name}, Роль: ${client.getRole()}`);

// 3. Створюємо товар та додаємо гарантію (Патерн Decorator)
let sofa = new Product("Кутовий диван", 15000);
console.log(`Базовий товар: ${sofa.getDescription()} - ${sofa.getPrice()} грн`);

sofa = new WarrantyDecorator(sofa);
console.log(`Товар після декоратора: ${sofa.getDescription()} - ${sofa.getPrice()} грн`);

// 4. Оформлюємо замовлення та оплачуємо (Патерн Strategy)
const order = new Order(client, sofa);
order.setPaymentStrategy(new CardPayment());

console.log("\n=== ПРОЦЕС ОПЛАТИ ===");
order.checkout();