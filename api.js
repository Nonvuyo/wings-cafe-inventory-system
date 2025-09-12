const api = {
    async getProducts() {
        const data = localStorage.getItem('products');
        return data ? JSON.parse(data) : [];
    },
    async saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    },
    async getSales() {
        const data = localStorage.getItem('sales');
        return data ? JSON.parse(data) : [];
    },
    async saveSales(sales) {
        localStorage.setItem('sales', JSON.stringify(sales));
    }
};