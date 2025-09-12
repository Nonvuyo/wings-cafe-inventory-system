import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Sales from "./components/Sales";
import Reports from "./components/Reports";
import ProductManagement from "./components/ProductManagement";
import productsData from "./data/products.json";
import salesData from "./data/sales.json";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Safely load data from JSON
    setProducts(Array.isArray(productsData) ? productsData : []);
    setSales(Array.isArray(salesData) ? salesData : []);
  }, []);

  // Add a new product
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      quantity: Number(product.quantity),
    };
    setProducts([...products, newProduct]);
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Update product stock
  const updateStock = (id, change = 0) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max((p.quantity || 0) + change, 0) }
          : p
      )
    );
  };

  // Add a new sale and reduce stock
  const addSale = ({ productId, productName, quantity, total }) => {
    const date = new Date().toISOString().split("T")[0];
    const sale = {
      id: Date.now(),
      productId: parseInt(productId),
      productName,
      quantity: parseInt(quantity),
      total,
      date,
    };
    setSales([...sales, sale]);
    updateStock(parseInt(productId), -parseInt(quantity));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e0f2fe", padding: "20px" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "20px" }}>
        Wings Cafe Inventory System
      </h1>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Dashboard Page */}
      {currentPage === "Dashboard" && <Dashboard products={products} sales={sales} />}

      {/* Products Page */}
      {currentPage === "Products" && (
        <div>
          {/* ProductTable displays the list first */}
          <ProductTable
            products={products || []}
            deleteProduct={deleteProduct}
            updateStock={updateStock}
          />
          
          {/* ProductForm comes after the table */}
          <ProductForm addProduct={addProduct} />
        </div>
      )}

      {/* Product Management Page */}
      {currentPage === "Product Management" && (
        <ProductManagement
          products={products || []}
          deleteProduct={deleteProduct}
          updateStock={updateStock}
        />
      )}

      {/* Sales Page */}
      {currentPage === "Sales" && (
        <Sales products={products || []} addSale={addSale} />
      )}

      {/* Reports Page */}
      {currentPage === "Reports" && <Reports products={products || []} sales={sales || []} />}

      <Footer />
    </div>
  );
}

export default App;
