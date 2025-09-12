import React from "react";

export default function ProductManagement({ products = [] }) {
  // If products is not an array or empty
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        No products to display
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management Report</h2>
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
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || index}>
              <td>{product.name || "-"}</td>
              <td>{product.description || "-"}</td>
              <td>{product.price != null ? product.price : 0}</td>
              <td>{product.quantity != null ? product.quantity : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
