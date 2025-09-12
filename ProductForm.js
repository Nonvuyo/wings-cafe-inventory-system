import React, { useState } from "react";

export default function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!product.name || !product.price || !product.quantity) {
      alert("Please fill in Name, Price, and Quantity!");
      return;
    }

    // Add the product with a unique ID and convert numbers
    addProduct({
      ...product,
      id: Date.now(),
      price: Number(product.price),
      quantity: Number(product.quantity),
    });

    // Clear form
    setProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
      // Add the product with a unique ID and convert numbers
    addProduct({
      ...product,
      id: Date.now(),
      price: Number(product.price),
      quantity: Number(product.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
