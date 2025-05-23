import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlotPage() {
  const [slots, setSlots] = useState([]);
  const [slotNumber, setSlotNumber] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchSlots = async () => {
    const res = await axios.get('http://localhost:5000/api/slots');
    setSlots(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/slots/${editingId}`, { slotNumber });
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/slots', { slotNumber });
    }
    setSlotNumber('');
    fetchSlots();
  };

  const handleEdit = (slot) => {
    setEditingId(slot._id);
    setSlotNumber(slot.slotNumber || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      await axios.delete(`http://localhost:5000/api/slots/${id}`);
      fetchSlots();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSlotNumber('');
  };

  useEffect(() => { fetchSlots(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Parking Slots</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" placeholder="Slot Number" className="input w-full" value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} required />
        <div className="flex space-x-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update Slot' : 'Add Slot'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Slot Number</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {slots.map(slot => (
            <tr key={slot._id} className="text-center">
              <td>{slot.slotNumber}</td>
              <td>{slot.slotStatus}</td>
              <td>
                <button onClick={() => handleEdit(slot)} className="bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(slot._id)} className="bg-red-600 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SlotPage;
