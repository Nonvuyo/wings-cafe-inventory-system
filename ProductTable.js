import React from "react";

export default function ProductTable({ products = [], deleteProduct, updateStock }) {
  // If products is not an array or empty
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        No products available
      </p>
    );
  }

  return (
    <table
      border="1"
      style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, index) => (
          <tr key={p.id || index}>
            <td>{p.name || "-"}</td>
            <td>{p.description || "-"}</td>
            <td>{p.price != null ? p.price : 0}</td>
            <td>{p.quantity != null ? p.quantity : 0}</td>
            <td>
              <button onClick={() => updateStock(p.id, 1)}>+ Stock</button>
              <button
                onClick={() => updateStock(p.id, -1)}
                disabled={!p.quantity || p.quantity <= 0}
              >
                - Stock
              </button>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
