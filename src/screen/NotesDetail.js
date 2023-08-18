import {ScrollView, StyleSheet, Text, TextInput, Button, View} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {NotesContext} from '../../store/NotesContext';

const todayDate = `${new Date().getDate()}-${
  new Date().getMonth() + 1
}-${new Date().getFullYear()}`;

const NotesDetail = ({route, navigation}) => {
  const [id, setID] = useState()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayDate);

  const {addNotes, updateNotes, isDarkMode} = useContext(NotesContext);
  const note = route.params?.note;

  useEffect(() => {
    if (note) {
      setID(note.id)
      setTitle(note.title);
      setDescription(note.description);
      setDate(note.date);
    }
  }, []);

  useEffect(() => {
    if (note) {
      const onBackNavigation = () => {
        updateNotes(id, title, description, date);
      };
      navigation.addListener('beforeRemove', onBackNavigation);

      return () => {
        navigation.removeListener('beforeRemove', onBackNavigation);
      };
    } else if (!note && title !== '' && description !== '') {
      const onBackNavigation = () => {
        addNotes(title, description, date);
      };
      navigation.addListener('beforeRemove', onBackNavigation);

      return () => {
        navigation.removeListener('beforeRemove', onBackNavigation);
      };
    }
  }, [title, description, date]);

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 55 : 75,
      paddingHorizontal: 25,
      flex: 1,
      backgroundColor: isDarkMode ?'black':'white',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        style={{fontSize: 22, fontWeight: '500'}}
        onChangeText={text => setTitle(text)}
      />
      <View style={{flexDirection: 'row', gap: 10}}>
      <Text style={{marginTop: 10, marginBottom: 20}}>{date}</Text>
      <Text style={{marginTop: 10, marginBottom: 20}}>-</Text>
      <Text style={{marginTop: 10, marginBottom: 20}}>{description.length} Characters</Text>
      </View>
      <TextInput
        style={{fontSize: 16, lineHeight: 25}}
        value={description}
        placeholder="start Typing"
        multiline={true}
        onChangeText={text => setDescription(text)}></TextInput>
    </ScrollView>
  );
};

export default NotesDetail;


