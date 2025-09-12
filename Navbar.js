import React from "react";

export default function Navbar({ currentPage, setCurrentPage }) {
  // Added "Product Management" to the pages
  const pages = ["Dashboard", "Products", "Product Management", "Sales", "Reports"];

  return (
    <nav style={{ marginBottom: "20px" }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            backgroundColor: currentPage === page ? "#6200ea" : "#eee",
            color: currentPage === page ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
