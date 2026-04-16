import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView'
import WelcomeView from './WelcomeView';

export default function(){
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  // Scroll to bottom helper
  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());
    scrollToBottom(false);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // UPDATED: Now accepts an argument for button clicks
  const sendMessage = (textFromButton = null) => {
    // If textFromButton exists (from a chip), use it. Otherwise use the typed text.
    const messageToSend = (typeof textFromButton === 'string') ? textFromButton : inputBarText;

    if (!messageToSend || messageToSend.trim().length === 0) return;

    // Create the message flow
    let newMessages = [{ direction: 'right', text: messageToSend.trim() }];
    
    // Get responses from Order.js
    const aResponse = handleInput(messageToSend.trim());
    
    for(const message of aResponse){
      newMessages.push({direction: "left", text: message});
    }

    // Update state
    setMessages([...messages, ...newMessages]);
    setInputBarText(''); // Clear the input bar
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {messages.length ? (
          <ChatView 
            scrollToBottom={scrollToBottom} 
            sendMessage={sendMessage} 
            scrollViewRef={scrollViewRef} 
            styles={styles} 
            messages={messages} 
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}  
          />
        ) : (
          <WelcomeView 
            scrollToBottom={scrollToBottom} 
            sendMessage={sendMessage} 
            scrollViewRef={scrollViewRef} 
            styles={styles} 
            messages={messages} 
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}  
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  messages: {
    flex: 1
  },
});