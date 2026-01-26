'use server';

import Message from "@/models/Message";
import Property from "@/models/Property";
import connectDB from "@/config/connectDB";
import { getSessionUser } from "@/utils/functions";
import { revalidatePath } from "next/cache";

export async function sendMessage(prevState,formData){
await connectDB();

const data = Object.fromEntries(formData);

const {sender,recipient,property,name,email,phone,body} = data;

const session = await getSessionUser();

if(!session){
    throw new Error('You must be logged in to send a message.');
}

const {userId} = session;

if(userId == sender){
    // throw new Error('Invalid user session.');
    return {success:false,message:'Invalid user session.'};
}

const newMessage = new Message({sender,recipient,property,name,email,phone,body});

await newMessage.save();    
return {success:true,message:'Message sent successfully.'};

}

export async function getUserMessages() {
  await connectDB();

  const session = await getSessionUser();
  if (!session) {
    throw new Error('You must be logged in.');
  }

  const { userId } = session;

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .populate('sender', 'name email')
    .populate('property', 'title')
    .sort({ createdAt: -1 })
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .populate('sender', 'username email')
    .populate('property', 'name')
    .sort({ createdAt: -1 })
    .lean();

  const messages = [...unreadMessages, ...readMessages].map(msg => ({
    ...msg,
    _id: msg._id.toString(),
    recipient: msg.recipient.toString(),
    sender: msg.sender && {
      ...msg.sender,
      _id: msg.sender._id.toString(),
    },
    property: msg.property && {
      ...msg.property,
      _id: msg.property._id.toString(),
    },
  }));

  return { messages };
}



export async function markMessageAsread(messageId){

    const session = await getSessionUser();
    if(!session){
        throw new Error('You must be logged in.');
    }

    const {userId} = session;

    const message = await Message.findById(messageId);

    if(!message){
        throw new Error('Message not found.');
    }

    if(message.recipient.toString() !== userId){
        throw new Error('Unauthorized.');
    }

    message.read = !message.read;

    await message.save();
    revalidatePath('/messages');

    return {success:true,message:'Message marked as read.'};
}