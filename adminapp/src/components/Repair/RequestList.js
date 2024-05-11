import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

const RequestList = () => {
  const [latestRepair, setLatestRepair] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchLatestRepair();
  }, [searchQuery, filterStatus]);

  const fetchLatestRepair = async () => {
    try {
      let q = collection(db, 'RepairRequest');

      // Apply search filter
      if (searchQuery) {
        q = query(q, orderBy('device'), where('device', '==', searchQuery));
      }

      // Apply status filter
      if (filterStatus) {
        q = query(q, orderBy('status'), where('status', '==', filterStatus));
      }

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestRepairData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLatestRepair(latestRepairData);
      } else {
        setLatestRepair([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching latest repair request:', error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'white', borderWidth: 1, borderColor: 'greenyellow', backgroundColor: 'green', width: 100, paddingLeft: 15, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      case 'pending':
        return { color: 'white', borderWidth: 1, borderColor: '#FF9999', backgroundColor: '#FF9999', width: 100, paddingLeft: 25, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      case 'in progress':
        return { color: 'white', borderWidth: 1, borderColor: '#FFFFCC', backgroundColor: '#007AFF', width: 100, paddingLeft: 16, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      default:
        return {};
    }
  };

  const statusIcons = {
    completed: { name: 'checkmark-done-outline', color: 'green' },
    pending: { name: 'alert-circle-outline', color: '#FF9999' },
    'in progress': { name: 'hourglass-outline', color: '#007AFF' },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Repair Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Description</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {latestRepair.map((request) => (
            <tr key={request.id}>
              <td>{request.device}</td>
              <td>{request.description}</td>
              {/* Render additional columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
