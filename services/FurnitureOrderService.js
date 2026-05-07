class FurnitureOrderService {
    constructor(inventoryRepo, paymentGateway, notificationService) {
        this.inventoryRepo = inventoryRepo;
        this.paymentGateway = paymentGateway;
        this.notificationService = notificationService; // Нова залежність для тестів
    }

    async placeOrder(orderData) {
        const { furnitureId, quantity, price, customerEmail } = orderData;

        // 1. ВАЛІДАЦІЯ
        if (!furnitureId) throw new Error("ID меблів обов'язкове");
        if (quantity <= 0) throw new Error("Кількість має бути > 0");
        if (price < 0) throw new Error("Ціна не може бути від'ємною");
        if (!customerEmail || !customerEmail.includes('@')) throw new Error("Некоректний email");

        // 2. ПЕРЕВІРКА СКЛАДУ
        const stock = await this.inventoryRepo.getQuantity(furnitureId);
        if (stock < quantity) {
            throw new Error(`Недостатньо товару. На складі лише: ${stock}`);
        }

        // 3. ОПЛАТА
        const isPaid = await this.paymentGateway.process(price * quantity);
        if (!isPaid) {
            throw new Error("Платіж відхилено банком");
        }

        // 4. ОНОВЛЕННЯ СКЛАДУ ТА ПОВІДОМЛЕННЯ
        await this.inventoryRepo.updateQuantity(furnitureId, stock - quantity);
        await this.notificationService.sendConfirmation(customerEmail, furnitureId);

        return { success: true, status: "ORDER_PROCESSED" };
    }
}

module.exports = FurnitureOrderService;