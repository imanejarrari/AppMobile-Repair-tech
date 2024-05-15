import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import BoxList from './Box';
import Badge from '@mui/material/Badge';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function stringAvatar(firstName, lastName) {
  if (!firstName || !lastName) {
    return {
      sx: {
        bgcolor: '#d3d3d3',
      },
      children: 'NA',
    };
  }
  
  return {
    sx: {
      bgcolor: '#d3d3d3',
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

const ImageAvatars = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayBoxList, setDisplayBoxList] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const [repairRequests, setRepairRequests] = useState([]);
  const [meetingRequests, setMeetingRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      // Fetch repair requests
      const repairRequestsSnapshot = await getDocs(collection(db, 'RepairRequest'));
      const repairData = repairRequestsSnapshot.docs.map(doc => doc.data());
      const filteredRepairRequests = repairData.filter(request => request.status === 'pending');
      setRepairRequests(filteredRepairRequests);

      // Fetch meeting requests
      const meetingRequestsSnapshot = await getDocs(collection(db, 'MeetingRequests'));
      const meetingData = meetingRequestsSnapshot.docs.map(doc => doc.data());
      const filteredMeetingRequests = meetingData.filter(request => request.status === 'canceled');
      setMeetingRequests(filteredMeetingRequests);

      // Calculate total notification count
      const totalNotificationCount = filteredRepairRequests.length + filteredMeetingRequests.length;
      setCountValue(totalNotificationCount);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === 'imanebenjarrari@gmail.com') {
          setDisplayName(userData); // Set the entire user data object
        }
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchRequests(); // Call fetchRequests inside useEffect to fetch data on component mount
  }, []);

  const LogOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    window.location.href = '/';
  };

  const { firstName, lastName } = displayName; // Destructure firstName and lastName from displayName

  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
      {!displayBoxList &&
        <Badge badgeContent={countValue} color='error'>
          <Avatar {...stringAvatar(firstName, lastName)} onClick={() => setDisplayBoxList(!displayBoxList)} />
        </Badge>
      }
      {displayBoxList &&
        <>
          <Avatar {...stringAvatar(firstName, lastName)} onClick={() => setDisplayBoxList(!displayBoxList)} />
          <div style={{ position: 'absolute', top: '-275%', left: '50%', zIndex: '1000' }}>
            <BoxList onLogOut={LogOut} />
          </div>
        </>
      }
    </div>
  );
};

export default ImageAvatars;
