import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarPage() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ plateNumber: '', driverName: '', phoneNumber: '' });

  const fetchCars = async () => {
    const res = await axios.get('http://localhost:5000/api/cars');
    setCars(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/cars', form);
    fetchCars();
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
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Add Car</button>
      </form>

      <table className="w-full border mt-4">
        <thead className="bg-gray-200">
          <tr><th>Plate Number</th><th>Driver Name</th><th>Phone Number</th></tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id} className="text-center">
              <td>{car.plateNumber}</td>
              <td>{car.driverName}</td>
              <td>{car.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarPage;
