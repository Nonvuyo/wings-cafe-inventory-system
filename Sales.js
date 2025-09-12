import React, { useState } from "react";

export default function Sales({ products, addSale }) {
  const [sale, setSale] = useState({ productId: "", quantity: 1 });

  const handleChange = (e) =>
    setSale({ ...sale, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === parseInt(sale.productId));
    if (!product) return alert("Please select a product");
    if (sale.quantity > product.quantity)
      return alert("Insufficient stock");

    // Add the sale
    addSale({
      productId: product.id,
      productName: product.name,
      quantity: parseInt(sale.quantity),
      total: product.price * sale.quantity,
    });

    // Reset form
    setSale({ productId: "", quantity: 1 });
  };

  const selectedProduct = products.find(
    (p) => p.id === parseInt(sale.productId)
  );

  return (
    <div>
      <h3>Record Sale</h3>
      <form onSubmit={handleSubmit}>
        <select
          name="productId"
          value={sale.productId}
          onChange={handleChange}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={sale.quantity}
          onChange={handleChange}
          min="1"
          max={selectedProduct ? selectedProduct.quantity : 1}
        />

        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
}
