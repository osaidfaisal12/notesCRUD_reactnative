import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {NotesContext} from '../../store/NotesContext';

const AllNotes = ({navigation}) => {
  const {notes, addNotes, deleteNotes} = React.useContext(NotesContext);

  return (
    <ScrollView style={{marginVertical: 15, paddingTop: Platform.OS === 'ios' ? 40 : 60}}>
      {/* <Button title="add note" onPress={addNotes} /> */}
      {notes.map((item, index) => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate('Notes Detail', {note: item});
            }}
            onLongPress={() => deleteNotes(item.id)}
            key={index}
            style={styles.container}>
            <Text style={{fontSize: 16, fontWeight: '500', marginBottom: 10}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', marginBottom: 5}}>
              {item.description}
            </Text>
            <Text style={{fontSize: 12, fontWeight: '400'}}>{item.date}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default AllNotes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
  },
});
