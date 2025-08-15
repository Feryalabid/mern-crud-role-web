import React, { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);

  // Load all products
  const loadProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/products", form);
      }
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Action failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({ name: product.name, description: product.description, price: product.price, imageUrl: product.imageUrl });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={addOrUpdateProduct} className="bg-white p-4 shadow rounded flex flex-col gap-3 mb-6 w-full md:w-1/2">
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleFormChange} className="border p-2 rounded" required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleFormChange} className="border p-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleFormChange} className="border p-2 rounded" required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleFormChange} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{editingId ? "Update" : "Add"} Product</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
