// RequestList.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepairRequests();
  }, []);

  const fetchRepairRequests = async () => {
    try {
      const querySnapshot = await getRepairRequests();
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repair requests:', error);
    }
  };

  const getRepairRequests = async () => {
    const collectionRef = db.collection('repairRequests');
    const snapshot = await collectionRef.get();
    return snapshot;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Repair Requests</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              {/* Render each request */}
              <div>{request.device}</div>
              <div>{request.description}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No repair requests found.</div>
      )}
    </div>
  );
};

export default RequestList;
