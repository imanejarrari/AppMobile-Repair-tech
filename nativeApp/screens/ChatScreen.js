import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FontAwesome } from '@expo/vector-icons'; // Import the icon from the library

const ChatScreen = ({ route }) => {
  const [technicianId, setTechnicianId] = useState(null); // Initialize technicianId as null
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [technicianName, setTechnicianName] = useState('');

  useEffect(() => {
    if (route && route.params && route.params.technicianId) {
      setTechnicianId(route.params.technicianId); // Set technicianId if it exists in route.params
    } else {
      console.error('Technician ID is missing');
    }
  }, [route]);

  useEffect(() => {
    if (technicianId) {
      const fetchTechnicianName = async () => {
        try {
          const technicianDoc = doc(db, 'Technicians', technicianId);
          const technicianData = await getDoc(technicianDoc);
          if (technicianData.exists()) {
            setTechnicianName(technicianData.data().Name);
          } else {
            console.error('Technician not found');
          }
        } catch (error) {
          console.error('Error fetching technician:', error);
        }
      };

      fetchTechnicianName();

      const unsubscribe = onSnapshot(query(collection(db, 'chats')), (snapshot) => {
        const messagesData = snapshot.docs.map(doc => doc.data());
        const technicianMessages = messagesData.filter(message => message.receiverId === technicianId);
        setMessages(technicianMessages);
      });

      return () => unsubscribe();
    }
  }, [technicianId]);

  const sendMessage = async () => {
    if (text.trim() === '') return;

    try {
      await addDoc(collection(db, 'chats'), {
        text,
        senderId: 'user', // Identify sender as user
        receiverId: technicianId, // Include technicianId as receiver
        createdAt: new Date()
      });
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../picture.png')} style={styles.profileImage} />
        <Text style={styles.username}>{technicianName}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        inverted // Reverse the scroll view to display latest messages at the bottom
      >
        {messages.slice().reverse().map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="black" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: '#8B322C',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
});
