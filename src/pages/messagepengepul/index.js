import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

const Message_P = ({ navigation, route }) => {
  const { jsonData, messageData } = route.params;

  useEffect(() => {
    console.log("NOW IN CHAT SCREEN");
    console.log("DATA SENT BY THE COMMUNITY:\n", jsonData);
    console.log("DATA Pesan :\n", messageData);
  }, []);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(messageData);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [senderNumber, setSenderNumber] = useState('YourPhoneNumber');
  const [selectedSenderId, setSelectedSenderId] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const senderNumbers = [
    { id: 1, number: 'Sender1PhoneNumber' },
    { id: 2, number: 'Sender2PhoneNumber' },
  ];

  useEffect(() => {
    setSenderNumber(jsonData.no_handphone);
    setRecipientNumber(jsonData.nomormsyarakat);
  }, [route]);

  const handleSend = () => {
    //if (inputText.trim() !== '') {
      const currentTime = new Date();
      const newMessage = {
        id: messages.length + 1,
        nomor: recipientNumber,
        text: inputText,
        timestamp: currentTime.toISOString(),
        senderNumber: senderNumber,
        senderId: selectedSenderId,
      };

      setMessages([...messages, newMessage]);

      setInputText('');

      sendToServer(newMessage);
    //}
  };

  const sendToServer = (message) => {
    const requestBody = {
      'nomor-masyarakat': message.nomor,
      'nomor-pengepul': message.senderNumber,
      'chat-pengepul': message.text,
      'time-pengepul': message.timestamp,
      'id-pengepul': message.senderId,
    };

    fetch('https://www.wastegps.online/fullstack/waste_gps/message/message.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Object.keys(requestBody)
        .map(
          key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              requestBody[key],
            )}`,
        )
        .join('&'),
    })
      .then(response => response.text())
      .then(textData => {
        console.log('SERVER OUTPUT:');
        console.log(textData);

        const responseMessage = {
          id: messages.length + 1,
          nomor: message.senderNumber,
          text: textData,
          timestamp: new Date().toISOString(),
          senderNumber: message.senderNumber,
          senderId: message.senderId,
        };
        setMessages([...messages, responseMessage]);
      })
      .catch(error => {
        Alert.alert('Error Message', error.message);
        return;
      });

      navigation.navigate('messagepengepul', { jsonData, messageData });
  };

  const messagesFlatList = useRef(null);

  const scrollToBottom = () => {
    if (messagesFlatList.current) {
      messagesFlatList.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.selectedSenderText}>
          My-Number: {senderNumber}
        </Text>
      </View>
      
      <FlatList
        ref={messagesFlatList}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.nomor_pengirim === senderNumber
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            <Text style={styles.messageText}>{item.pesan} {item.text}</Text>
            <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
          </View>
        )}
        onContentSizeChange={() => scrollToBottom()}
        onLayout={() => scrollToBottom()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>send</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Sender Number</Text>

            {senderNumbers.map(numberObj => (
              <Pressable
                key={numberObj.id}
                style={styles.senderNumberItem}
                onPress={() => {
                  setSenderNumber(numberObj.number);
                  setSelectedSenderId(numberObj.id);
                  setModalVisible(false);
                }}
              >
                <Text>{numberObj.number}</Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  userMessageContainer: {
    backgroundColor: '#4e79a0',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12, 
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  botMessageContainer: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 4,
  },
  messageSender: {
    fontSize: 12,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    borderColor: '#4e79a0',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
  },
  sendButton: {
    width: 50,
	height: 50,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#1abc9c',
	borderRadius: 25,
	shadowColor: 'rgba(0, 0, 0, 0.3)',
	shadowOffset: { width: 0, height: 2 },
	shadowRadius: 2,
	shadowOpacity: 1,
	elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    padding: 10,
  },
  selectedSenderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  senderNumberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    backgroundColor: '#4e79a0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default Message_P;