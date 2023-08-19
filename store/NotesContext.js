import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

const initialState = {

};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(false)

    const getNotes = async () => {
        const jsonValue = await AsyncStorage.getItem('notes')
        return jsonValue != null ? setNotes(JSON.parse(jsonValue)) : null;
    }

    const addNotes = async (title, description, date) => {
        try {
            const newNote = {
                id: Math.random() * 999,
                title,
                description,
                date
            };
    
            const existingNotes = await AsyncStorage.getItem('notes');
            const parsedNotes = existingNotes ? JSON.parse(existingNotes) : [];
            const updatedNotes = [newNote, ...parsedNotes];   
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    } 

    const deleteNotes = async (id) => {
        try {
            const newNotes = notes.filter(item => item.id !== id);
            setNotes(newNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    const updateNotes = async (id, title, description, date) => {
        try {
            const existingNoteIndex = notes.findIndex(note => note.id === id);
            
            if (existingNoteIndex !== -1) {
                const updatedNotes = [...notes];
                updatedNotes[existingNoteIndex] = { id, title, description, date };
                setNotes(updatedNotes);
                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    }


    const value = {
        notes,
        addNotes,
        deleteNotes,
        updateNotes,
        isDarkMode,
        setIsDarkMode,
        getNotes
    }

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};