import { getUserMessages } from '@/actions/messages.action'
import MessageCard from '@/components/MessageCard';
import React from 'react'

const page = async () => {

    const {messages} = await getUserMessages();

    console.log(messages)
  return (
    <div className="max-w-7xl mx-auto py-24 bg-gray-300 min-h-screen">
        <div className="p-8 rounded-lg ">
            <h1 className="text-2xl font-bold mb-6">
                Your Messages
            </h1>
            {messages.length > 0 ? messages.map((message) => (
                <MessageCard key={message._id} message={message} />
            )):(
                <p>No messages found.</p>
            )}
        </div>
    </div>
  )
}

export default page