import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {NotesContext} from '../../store/NotesContext';
import {Appearance} from 'react-native';

const AllNotes = ({navigation}) => {
  const {notes, addNotes, deleteNotes, isDarkMode, setIsDarkMode, getNotes} =
    React.useContext(NotesContext);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    getNotes()
  },[])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
      marginHorizontal: 15,
      marginBottom: 15,
      padding: 15,
      borderRadius: 15,
    },
    addBtn: {
      position: 'absolute',
      backgroundColor: '#ffae42',
      width: 50,
      height: 50,
      alignItems: 'center',
      borderRadius: 999,
      alignSelf: 'flex-start',
      right: 20,
      bottom: 20,
      flex: 1,
    },
    activeCard: {
      backgroundColor: isDarkMode ? '#4a4a4a' : '#b4b4b4',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      fontSize: 16,
    },
    card: {
      backgroundColor: isDarkMode ? '#1e1e1e' : '#d4d4d4',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      fontSize: 16,
    },
  });

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 40 : 75,
        flex: 1,
        backgroundColor: isDarkMode ? '#000' : '',
      }}>
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: 'row',
          gap: 10,
          marginBottom: 15,
        }}>
        <Text style={styles.activeCard}>All</Text>
        <Text style={styles.card}>Today</Text>
        <Text style={styles.card}>Month</Text>
        <Text style={styles.card}>Year</Text>
      </View>
      <FlatList
        key={item => item.id}
        data={notes}
        renderItem={({item}) => {
          const truncatedName =
            item.description.length > 40
              ? `${item.description.slice(0, 40)}...`
              : item.description;

          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Notes Detail', {note: item});
              }}
              onLongPress={() => deleteNotes(item.id)}
              style={styles.container}>
              <Text style={{fontSize: 16, fontWeight: '500', marginBottom: 10}}>
                {item.title}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', marginBottom: 5}}>
                {truncatedName}
              </Text>
              <Text style={{fontSize: 12, fontWeight: '400'}}>{item.date}</Text>
            </Pressable>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Notes Detail')}
        style={styles.addBtn}>
        <Text style={{color: 'white', fontSize: 32}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllNotes;
