import React, { useState } from "react";

export default function CustomerForm({ addCustomer }) {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) return;
    addCustomer(customer);
    setCustomer({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Customer Name" value={customer.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={customer.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} />
      <button type="submit">Add Customer</button>
    </form>
  );
}
