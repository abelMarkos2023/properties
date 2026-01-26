'use client'

import { markMessageAsread } from '@/actions/messages.action'
import { useGlobalContext } from '@/contexts/GlobalContext';
import React from 'react'

const MessageCard = ({ message }) => {

    const {setUnreadcount,unreadcount} = useGlobalContext();

    const handleMarkAsRead = async () =>{
        
        setUnreadcount(prev => message.read ? prev + 1 : prev - 1);
       try {
        // Persist to database
        await markMessageAsread(message._id, message.read);
    } catch (error) {
        // Rollback if it fails
        setUnreadcount(unreadcount);
        console.error('Failed to mark message as read:', error);
    }
    }
  return (
    <div className="relative bg-white rounded-md shadow-md border border-gray-200 p-4">
        
        {!message.read && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                New
            </span>
        )}
        
        <h2 className="text-xl mb-4">
            <span className="font-bold">Property Inquiry: {' '}</span>
            {message.property?.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>
        <ul className="mt-4 flex flex-col gap-2">
            <li>
                <strong>Reply Email: {' '}</strong>
                <a href={`mailto:${message.email}`}>
                    {message.sender.email}
                </a>
            </li>
            <li>
                <strong>Reply Phone: {' '}</strong>
                <a href={`tel:${message.phone}`}>
                    {message.phone}
                </a>
            </li>
            <li>
                <strong>Received: {' '}</strong>
                <span>{new Date(message.createdAt).toLocaleString()}</span>
            </li>
        </ul>
        <button onClick = {handleMarkAsRead} className="mt-4 rounded-md shadow-md cursor-pointer hover:bg-blue-700 mr-3 bg-blue-500 py-1 px-3 text-white">
            {
                message.read ? 'Mark as unread' : 'Mark as read'
            }
        </button>
        <button className="mt-4 rounded-md shadow-md cursor-pointer hover:bg-red-700 bg-red-500 py-1 px-3 text-white">Delete</button>
    </div>
  )
}

export default MessageCard