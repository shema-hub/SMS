import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ record: '', amountPaid: 0 });
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchAll = async () => {
    const [paymentRes, recordRes] = await Promise.all([
      axios.get('http://localhost:5000/api/payements'),
      axios.get('http://localhost:5000/api/records')
    ]);
    setPayments(paymentRes.data);
    setRecords(recordRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/payements/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/payements', form);
    }
    setForm({ record: '', amountPaid: 0 });
    fetchAll();
  };

  const handleEdit = (payment) => {
    setEditingId(payment._id);
    setForm({
      record: payment.record?._id || '',
      amountPaid: payment.amountPaid || 0,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await axios.delete(`http://localhost:5000/api/payements/${id}`);
      fetchAll();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ record: '', amountPaid: 0 });
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
            <option key={r._id} value={r._id}>{r.car?.plateNumber} - {new Date(r.entryTime).toLocaleString()}</option>
          ))}
        </select>
        <input type="number" className="input w-full" placeholder="Amount Paid" value={form.amountPaid} onChange={(e) => setForm({ ...form, amountPaid: e.target.value })} required />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            {editingId ? 'Update Payment' : 'Add Payment'}
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
          <tr><th>Plate</th><th>Amount</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {payments.map(pay => (
            <tr key={pay._id} className="text-center">
              <td>{pay.record?.car?.plateNumber || 'N/A'}</td>
              <td>{pay.amountPaid} Rwf</td>
              <td>{new Date(pay.paymentDate).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(pay)} className="bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(pay._id)} className="bg-red-600 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentPage;
