// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        bookmarks: [],
    });

    useEffect(() => {
        const loadBookmarks = async () => {
            const bookmarks = await AsyncStorage.getItem('bookmarks');
            if (bookmarks) {
                setUser((prevUser) => ({
                    ...prevUser,
                    bookmarks: JSON.parse(bookmarks),
                }));
            }
        };

        loadBookmarks();
    }, []);

    const addBookmark = async (id) => {
        const updatedBookmarks = [...user.bookmarks, id];
        setUser((prevUser) => ({
            ...prevUser,
            bookmarks: updatedBookmarks,
        }));
        await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    };

    const removeBookmark = async (id) => {
        const updatedBookmarks = user.bookmarks.filter((bookmarkId) => bookmarkId !== id);
        setUser((prevUser) => ({
            ...prevUser,
            bookmarks: updatedBookmarks,
        }));
        await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    };

    return (
        <UserContext.Provider value={{ user, addBookmark, removeBookmark }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
