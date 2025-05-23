import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarPage() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ plateNumber: '', driverName: '', phoneNumber: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchCars = async () => {
    const res = await axios.get('http://localhost:5000/api/cars');
    setCars(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/cars/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/cars', form);
    }
    fetchCars();
    setForm({ plateNumber: '', driverName: '', phoneNumber: '' });
  };

  const handleEdit = (car) => {
    setEditingId(car._id);
    setForm({
      plateNumber: car.plateNumber || '',
      driverName: car.driverName || '',
      phoneNumber: car.phoneNumber || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      fetchCars();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ plateNumber: '', driverName: '', phoneNumber: '' });
  };

  useEffect(() => { fetchCars(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cars</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input type="text" placeholder="Plate Number" className="input w-full" value={form.plateNumber} onChange={(e) => setForm({ ...form, plateNumber: e.target.value })} required />
        <input type="text" placeholder="Driver Name" className="input w-full" value={form.driverName} onChange={(e) => setForm({ ...form, driverName: e.target.value })} required />
        <input type="text" placeholder="Phone Number" className="input w-full" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} required />
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
            {editingId ? 'Update Car' : 'Add Car'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-white py-2 px-4 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full border mt-4">
        <thead className="bg-gray-200">
          <tr><th>Plate Number</th><th>Driver Name</th><th>Phone Number</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id} className="text-center">
              <td>{car.plateNumber}</td>
              <td>{car.driverName}</td>
              <td>{car.phoneNumber}</td>
              <td>
                <button onClick={() => handleEdit(car)} className="bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(car._id)} className="bg-red-600 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarPage;
