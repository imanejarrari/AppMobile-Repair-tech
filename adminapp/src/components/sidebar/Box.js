import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import "./Sidebar.css";

const BoxList = ({ onLogOut }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [repairRequests, setRepairRequests] = useState([]);
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [countValue, setCountValue] = useState(0);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Box sx={{ width: '200px', bgcolor: '#cfcfcf', zIndex: '100', borderRadius: '20px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation() }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding >
              <ListItemButton onClick={handleOpenDialog}>
                <ListItemIcon>
                  <Badge badgeContent={countValue} color="error">
                    <CircleNotificationsIcon style={{ color: 'white' }} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={"Notifications"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onLogOut}>
              <ListItemButton>
                <ListItemIcon>
                  <MeetingRoomIcon style={{ color: 'white' }} />
                </ListItemIcon >
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} onClick={(e) => { e.stopPropagation() }} fullWidth="500px">
        <DialogTitle ><u><b>Notifications:</b></u></DialogTitle>
        <DialogContent>
          <DialogContentText>
          {repairRequests.map((request) => (
  <div key={request.id}>
    <p className='border-bottom border-dark-subtle labelDesign p-2'>
      <FontAwesomeIcon icon={faWarning} className='mx-2' color='orange' />
     You have a new repair request from  <b>{request.clientName} </b> 
    </p>
  </div>
))}
{meetingRequests.map((request) => (
  <div key={request.id}>
    <p className='border-bottom border-dark-subtle labelDesign p-2'>
      <FontAwesomeIcon icon={faWarning} className='mx-2' color='orange' />
     You have a new meeting request from <b> {request.fullName} </b> 
    </p>
  </div>
))}

            {(repairRequests.length === 0 && meetingRequests.length === 0) && <p>No new notifications.</p>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoxList;
