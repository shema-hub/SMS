import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecordPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ car: '', slot: '', entryTime: '', exitTime: '' });
  const [cars, setCars] = useState([]);
  const [slots, setSlots] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchAll = async () => {
    const [carRes, slotRes, recordRes] = await Promise.all([
      axios.get('http://localhost:5000/api/cars'),
      axios.get('http://localhost:5000/api/slots'),
      axios.get('http://localhost:5000/api/records')
    ]);
    setCars(carRes.data);
    setSlots(slotRes.data);
    setRecords(recordRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing record
      await axios.put(`http://localhost:5000/api/records/${editingId}`, form);
      setEditingId(null);
    } else {
      // Create new record
      await axios.post('http://localhost:5000/api/records', form);
    }
    setForm({ car: '', slot: '', entryTime: '', exitTime: '' });
    fetchAll();
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setForm({
      car: record.car?._id || '',
      slot: record.slot?._id || '',
      entryTime: record.entryTime ? new Date(record.entryTime).toISOString().slice(0,16) : '',
      exitTime: record.exitTime ? new Date(record.exitTime).toISOString().slice(0,16) : '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`http://localhost:5000/api/records/${id}`);
      fetchAll();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ car: '', slot: '', entryTime: '', exitTime: '' });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Parking Records</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <select className="input w-full" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} required>
          <option value="">Select Car</option>
          {cars.map(car => (
            <option key={car._id} value={car._id}>{car.plateNumber}</option>
          ))}
        </select>
        <select className="input w-full" value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} required>
          <option value="">Select Slot</option>
          {slots.map(slot => (
            <option key={slot._id} value={slot._id}>{slot.slotNumber}</option>
          ))}
        </select>
        <input type="datetime-local" className="input w-full" value={form.entryTime} onChange={(e) => setForm({ ...form, entryTime: e.target.value })} required />
        <input type="datetime-local" className="input w-full" value={form.exitTime} onChange={(e) => setForm({ ...form, exitTime: e.target.value })} />
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
            {editingId ? 'Update Record' : 'Add Record'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-white py-2 px-4 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Plate</th><th>Slot</th><th>Entry</th><th>Exit</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {records.map(rec => (
            <tr key={rec._id} className="text-center">
              <td>{rec.car?.plateNumber || 'N/A'}</td>
              <td>{rec.slot?.slotNumber || 'N/A'}</td>
              <td>{new Date(rec.entryTime).toLocaleString()}</td>
              <td>{rec.exitTime ? new Date(rec.exitTime).toLocaleString() : '—'}</td>
              <td>
                <button onClick={() => handleEdit(rec)} className="bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(rec._id)} className="bg-red-600 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordPage;
