import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportPage() {
  const [records, setRecords] = useState([]);
  const [plate, setPlate] = useState('');
  const [filtered, setFiltered] = useState([]);

  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/records');
    setRecords(res.data);
    setFiltered(res.data);
  };

  const filterByPlate = () => {
    setFiltered(records.filter(r => r.car?.plateNumber.includes(plate.toUpperCase())));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <input type="text" placeholder="Search by Plate Number" className="input w-full mb-4" value={plate} onChange={(e) => setPlate(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 mb-4 rounded" onClick={filterByPlate}>Filter</button>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Plate</th><th>Entry</th><th>Exit</th><th>Duration (hrs)</th></tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r._id} className="text-center">
              <td>{r.car?.plateNumber}</td>
              <td>{new Date(r.entryTime).toLocaleString()}</td>
              <td>{r.exitTime ? new Date(r.exitTime).toLocaleString() : '—'}</td>
              <td>{r.duration || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportPage;
