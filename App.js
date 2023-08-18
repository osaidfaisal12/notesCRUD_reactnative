import {StyleSheet, Text, Button} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NotesContext, NotesProvider} from './store/NotesContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllNotes from './src/screen/AllNotes';
import NotesDetail from './src/screen/NotesDetail';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true
        }}>
          <Stack.Screen options={({navigation}) => ({
            headerRight: () => (
              <Button title='+' onPress={() => navigation.navigate("Notes Detail")} />
            )
          })} name="All Notes" component={AllNotes} />
          <Stack.Screen options={{
            title: ''
          }} name="Notes Detail" component={NotesDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
