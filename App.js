import {StyleSheet, Text, Button, Appearance} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NotesContext, NotesProvider} from './store/NotesContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllNotes from './src/screen/AllNotes';
import NotesDetail from './src/screen/NotesDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') { 
      setIsDarkMode(true)
    }
  },[])

  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true
        }}>
          <Stack.Screen options={{
            headerTintColor: isDarkMode? 'white' : ''
          }} name="All Notes" component={AllNotes} />
          <Stack.Screen options={{
            title: '',
            headerTintColor: isDarkMode? 'white' : ''
          }} name="Notes Detail" component={NotesDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
