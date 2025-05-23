import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlotPage() {
  const [slots, setSlots] = useState([]);
  const [slotNumber, setSlotNumber] = useState('');

  const fetchSlots = async () => {
    const res = await axios.get('http://localhost:5000/api/slots');
    setSlots(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/slots', { slotNumber });
    setSlotNumber('');
    fetchSlots();
  };

  useEffect(() => { fetchSlots(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Parking Slots</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" placeholder="Slot Number" className="input w-full" value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Add Slot</button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Slot Number</th><th>Status</th></tr>
        </thead>
        <tbody>
          {slots.map(slot => (
            <tr key={slot._id} className="text-center">
              <td>{slot.slotNumber}</td>
              <td>{slot.slotStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SlotPage;
