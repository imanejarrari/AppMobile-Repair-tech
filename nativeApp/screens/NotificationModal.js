import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationModal = ({ visible, notifications, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1} // Prevents the TouchableOpacity from triggering onPress immediately
        onPress={onClose} // Close the modal when clicked outside
      >
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={onClose}
          >
            <Ionicons
              name="close"
              size={24}
              color="#8B322C"
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle} >Notifications</Text>
          <View style={styles.notificationList}>
            {notifications.map((notification, index) => (
              <View key={index} style={styles.notificationItemContainer}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons
                    name="checkmark-done-outline"
                    size={24}
                    color="white"
                  />
                </View>
                <Text style={styles.notificationText}>{notification}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    height: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    color:'#8B322C',
  },
  notificationList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  notificationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth:1,
    paddingBottom:10,
    borderTopWidth:0,
    borderRightColor:'whitesmoke',
    borderLeftColor:'whitesmoke',
    borderBottomColor:'grey',
    borderBottomWidth:0.5
  },
  notificationIconContainer: {
    width: 10,
    height: 10,
    borderRadius: 20, 
    backgroundColor: '#8B322C', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  notificationText: {
    fontSize: 14,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default NotificationModal;
