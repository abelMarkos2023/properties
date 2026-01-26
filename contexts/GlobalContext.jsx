'use client';

import { getUserMessages } from '@/actions/messages.action';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [unreadcount, setUnreadcount] = useState(0);

    useEffect(() => {
        // Here you can fetch the initial unread messages count from an API or local storage
        // For demonstration, we'll set it to a static number

        const userMessages = getUserMessages().then(res => {
            const unreadMessages = res.messages.filter(msg => !msg.read);
            setUnreadcount(unreadMessages.length);
        });
        setUnreadcount(5); // Example static count
    }, []);

    return (
        <GlobalContext.Provider value={{ unreadcount, setUnreadcount }}>
            {children}
        </GlobalContext.Provider>
    );
}
export const useGlobalContext = () => useContext(GlobalContext);