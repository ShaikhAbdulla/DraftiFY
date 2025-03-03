import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, BackHandler, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addDraft, updateDraft } from '../../redux/slices/draftSlice';
import AppHeader from '../../components/reusable/Header';
import AnimatedTextInput from '../../components/reusable/AnimatedTextInput';
import { sendEmail } from '../../services/EmailJsServices';
import ToastMessage from '../../Utils';

const EmailEditorScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const existingDraft = route.params?.draft || null;
  const [recipient, setRecipient] = useState(existingDraft?.recipient || '');
  const [subject, setSubject] = useState(existingDraft?.subject || '');
  const [body, setBody] = useState(existingDraft?.body || '');

  const profilePic = 'https://randomuser.me/api/portraits/women/2.jpg'; // Profile image kept in data


  useEffect(() => {
    const backAction = () => {
      console.log('testingg'); 
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
}, [onBack]);

  const saveDraft = () => {
    if (existingDraft) {
      dispatch(updateDraft({ id: existingDraft.id, recipient, subject, body, profilePic, status: existingDraft.status, date: existingDraft.date }));
    } else {
      dispatch(addDraft({ id: Date.now(), recipient, subject, body, profilePic, status: 'Draft' }));
    }
    navigation.goBack();
  };


  const senEmail = async () => {
    if (!existingDraft) {
      dispatch(addDraft({ id: Date.now(), recipient, subject, body, profilePic, status: 'Sent', date: new Date().toLocaleString() }));
    }
    try {
      if(recipient && subject && body){
      const res = await sendEmail('abdullahydershaikh@gmail.com',
        recipient,
        subject,
        body,
        dispatch,
        {
          id: existingDraft ? existingDraft.id : Date.now(),
          recipient,
          subject,
          body,
          profilePic,
          status: 'Sent',
          date: existingDraft ? existingDraft.date : new Date().toLocaleString()
        })
      if (res.success) {
        dispatch(updateDraft({
          id: existingDraft ? existingDraft.id : Date.now(),
          recipient,
          subject,
          body,
          profilePic,
          status: 'Sent',
          date: existingDraft ? existingDraft.date : new Date().toLocaleString()
        }));
        ToastMessage('Email sent')
        navigation.navigate('Home', { screen: 'Sent' });
      }
      else{
        ToastMessage('Error Sending email')
      }
     
    } else{
      ToastMessage('Please fill out all details')
    }
    } catch (error) {
      ToastMessage('Error Sending email')
    }
  }

  const onBack = () => {
    if (recipient || subject || body) {  
        saveDraft(); 
        ToastMessage('Saved as Draft');
    }
    navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
    });
};
  return (
    <SafeAreaView style={{flex:1}}>
    <StatusBar backgroundColor={'#6200ee'}/>
    <View style={styles.container}>
      <AppHeader
        onBack={() => onBack()}
        showBackButton
        title="Compose"
        onClickSend={() => senEmail()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <AnimatedTextInput
        disable={true}
            placeholder="From"
            value={'abdullahydershaikh@gmail.com'}
            onChangeText={setRecipient}
          />
          <AnimatedTextInput
            placeholder="To"
            value={recipient}
            onChangeText={setRecipient}
          />
          <AnimatedTextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />
          <AnimatedTextInput
            placeholder="Compose email"
            value={body}
            onChangeText={setBody}
            multiline
            style={{ minHeight: 200, textAlignVertical: 'top' }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
});

export default EmailEditorScreen;
