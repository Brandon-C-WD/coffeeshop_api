// product-manager.js

class ProductManager {
    constructor() {
        this.products = [
            { id: 1, name: "Espresso", price: 3.00, description: "Rich and bold single shot of espresso", category: "Coffee" },
            { id: 2, name: "Cappuccino", price: 4.50, description: "Espresso with steamed milk and thick foam", category: "Coffee" },
            { id: 3, name: "Latte", price: 4.75, description: "Smooth espresso with lots of steamed milk and light foam", category: "Coffee" },
            { id: 4, name: "Cold Brew", price: 4.00, description: "Steeped for 24 hours for a smooth, low-acidity taste", category: "Cold Drinks" },
            { id: 5, name: "Matcha Green Tea Latte", price: 5.00, description: "Japanses green tea powder blended with steamed milk", category: "Tea" },
            { id: 6, name: "Blueberry Muffin", price: 3.50, description: "Freshly baked muffin packed with organic blueberries", category: "Bakery" }
        ];
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }
}

export default new ProductManager();