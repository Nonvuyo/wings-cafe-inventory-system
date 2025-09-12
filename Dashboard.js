import React from "react";
import chipsImg from "../assets/chips.jpeg";
import wingsImg from "../assets/wings.jpeg";
import coffeeImg from "../assets/coffee.jpeg";
import drinksImg from "../assets/drinks.jpeg";
import pizzaImg from "../assets/pizza.jpeg"; // added pizza image

export default function Dashboard() {
  // Updated products array with pizza
  const products = [
    { id: 1, name: "Chips", quantity: 10 },
    { id: 2, name: "Wings", quantity: 3 },
    { id: 3, name: "Coffee", quantity: 8 },
    { id: 4, name: "Drinks", quantity: 2 },
    { id: 5, name: "Pizza", quantity: 5 }, // added pizza
  ];

  const lowStock = products.filter((p) => p.quantity < 5).length;

  // Function to get image based on product name
  const getImage = (name) => {
    if (name.toLowerCase() === "chips") return chipsImg;
    if (name.toLowerCase() === "wings") return wingsImg;
    if (name.toLowerCase() === "coffee") return coffeeImg;
    if (name.toLowerCase() === "drinks") return drinksImg;
    if (name.toLowerCase() === "pizza") return pizzaImg; // pizza image
    return ""; // default placeholder if needed
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Dashboard</h2>
      <p>Total Products: {products.length}</p>
      <p>Low Stock Alerts: {lowStock}</p>

      <h3>Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "10px",
              width: "150px",
              borderRadius: "8px",
              backgroundColor: product.quantity < 5 ? "#ffe6e6" : "#f9f9f9", // red tint for low stock
              position: "relative",
            }}
          >
            {product.quantity < 5 && (
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Low Stock
              </span>
            )}
            <img
              src={getImage(product.name)}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
            />
            <p style={{ fontWeight: "bold", margin: "10px 0 5px 0" }}>{product.name}</p>
            <p>Qty: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
