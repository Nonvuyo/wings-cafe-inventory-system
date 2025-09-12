import React from "react";

export default function Reports({ sales }) {
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <h3>Reports</h3>
      <p>Total Sales: {sales.length}</p>
      <p>Total Revenue: ${totalRevenue}</p>
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Quantity</th>
            
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.productName}</td>
    
              <td>{s.quantity}</td>
              <td>{s.total}</td>
              <td>{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
