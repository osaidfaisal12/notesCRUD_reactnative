import React, { createContext, useState } from 'react';

const initialState = {

};

export const NotesContext = createContext(initialState);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([])

    const addNotes = (title, description, date) => {
        setNotes([...notes, {
            id: Math.random() * 999,
            title,
            description,
            date
        }])
    } 

    const deleteNotes = (id) => {
        const newNotes = notes.filter(item => item.id !== id)
        setNotes(newNotes)
        console.log(notes)
    }

    const value = {
        notes,
        addNotes,
        deleteNotes
    }

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};