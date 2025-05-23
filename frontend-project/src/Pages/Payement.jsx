import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ record: '', amountPaid: 0 });
  const [records, setRecords] = useState([]);

  const fetchAll = async () => {
    const [paymentRes, recordRes] = await Promise.all([
      axios.get('http://localhost:5000/api/payments'),
      axios.get('http://localhost:5000/api/records')
    ]);
    setPayments(paymentRes.data);
    setRecords(recordRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/payments', form);
    setForm({ record: '', amountPaid: 0 });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <select className="input w-full" value={form.record} onChange={(e) => setForm({ ...form, record: e.target.value })} required>
          <option value="">Select Parking Record</option>
          {records.map(r => (
            <option key={r._id} value={r._id}>{r.car?.plateNumber} - {r.entryTime}</option>
          ))}
        </select>
        <input type="number" className="input w-full" placeholder="Amount Paid" value={form.amountPaid} onChange={(e) => setForm({ ...form, amountPaid: e.target.value })} required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Add Payment</button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Plate</th><th>Amount</th><th>Date</th></tr>
        </thead>
        <tbody>
          {payments.map(pay => (
            <tr key={pay._id} className="text-center">
              <td>{pay.record?.car?.plateNumber || 'N/A'}</td>
              <td>{pay.amountPaid} Rwf</td>
              <td>{new Date(pay.paymentDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentPage;
