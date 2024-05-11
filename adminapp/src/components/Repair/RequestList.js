import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';

const RepairRequests = () => {
  const [repairRequests, setRepairRequests] = useState([]);

  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const repairRequestsCollection = db.collection('RepairRequest');
        const snapshot = await repairRequestsCollection.get();
        const repairRequestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRepairRequests(repairRequestsData);
      } catch (error) {
        console.error('Error fetching repair requests:', error);
      }
    };

    fetchRepairRequests();
  }, []);

  return (
    <div>
      <h2>Repair Requests</h2>
      <ul>
        {repairRequests.map((request) => (
          <li key={request.id}>
            {/* Render the details of each repair request */}
            EGEGAEB
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairRequests;
