import {ScrollView, StyleSheet, Text, TextInput, Button} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { NotesContext } from '../../store/NotesContext';

const todayDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`

const NotesDetail = ({route}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayDate);

  const {addNotes} = useContext(NotesContext)

  useEffect(() => {
    const note = route.params?.note;
    console.log(note);
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setDate(note.date);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        style={{fontSize: 22, fontWeight: '500'}}
        onChangeText={text => setTitle(text)}
      />
      <Text style={{marginTop: 10, marginBottom: 20}}>{date}</Text>
      <TextInput
        style={{fontSize: 16}}
        value={description}
        placeholder='start Typing'
        onChangeText={text => setDescription(text)}></TextInput>
        <Button title='Click to save' onPress={() => addNotes(title, description, date)} />
    </ScrollView>
  );
};

export default NotesDetail;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 55 : 75,
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: 'white',
  },
});
