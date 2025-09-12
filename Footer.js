import React from "react";

export default function Footer() {
  return (
    <footer style={{ marginTop: "20px", backgroundColor: "#f2f2f2", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        
        {/* Location Card */}
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          margin: "10px",
          flex: "1 1 200px"
        }}>
          <h3>Location</h3>
          <p>123 Thetsane,<br />Maseru, Lesotho</p>
        </div>
        
        {/* Contacts Card */}
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          margin: "10px",
          flex: "1 1 200px"
        }}>
          <h3>Contacts</h3>
          <p>Phone: +266 58017052<br />Email: info@wingscafe.com</p>
        </div>
        
        {/* About Us Card */}
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          margin: "10px",
          flex: "1 1 200px"
        }}>
          <h3>About Us</h3>
          <p>Wings Cafe is your go-to spot for delicious wings, beverages, and a cozy atmosphere. Open 06:00 am - 09:00pmdaily to serve our loyal customers!</p>
        </div>
        
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Wings Cafe Inventory System &copy; 2025
      </p>
    </footer>
  );
}
