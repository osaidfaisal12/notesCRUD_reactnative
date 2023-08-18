import React, { createContext, useState } from 'react';

const initialState = {

};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(false)

    const addNotes = (title, description, date) => {
        setNotes([{
            id: Math.random() * 999,
            title,
            description,
            date
        }, ...notes])
    } 

    const deleteNotes = (id) => {
        const newNotes = notes.filter(item => item.id !== id)
        setNotes(newNotes)
    }

    const updateNotes = (id, title, description, date) => {
        const existingNoteIndex = notes.findIndex(note => note.id === id);
        
        if ( existingNoteIndex !== -1) {
            const updatedNotes = [...notes]
            updatedNotes[existingNoteIndex] = {title, description, date}
            setNotes(updatedNotes)
        } else {
            return
        }
    }


    const value = {
        notes,
        addNotes,
        deleteNotes,
        updateNotes,
        isDarkMode,
        setIsDarkMode
    }

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};