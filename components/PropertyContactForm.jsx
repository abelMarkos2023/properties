'use client'

import { sendMessage } from '@/actions/messages.action';
import { useSession } from 'next-auth/react';
import {useActionState,useEffect} from 'react'
import { toast } from 'react-toastify';
import SubmitButton from './SubmitButton';

const PropertyContactForm = ({property}) => {

  const {data:session} = useSession();

  const [state,action] = useActionState(sendMessage,{});


  useEffect(() => {
    if(state?.success){
      toast.success(state.message);
    }
    else if(state?.success === false && state?.message){
      toast.error(state.message);
    }
  },[state]);

  if(state?.success){
    return (
      <p className="text-green-300 text-center font-bold">Message Sent Successfully</p>
    )
  }
  return session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
              <form action={action} className="space-y-4">
                <input type="hidden" name="recipient" value={property.owner} />
                <input type="hidden" name="sender" value={session.user?.id} />
                <input type="hidden" name="property" value={property._id} />
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="body"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="body"
                    name="body"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <SubmitButton />
                </div>
              </form>
            </div>
  ) 
}

export default PropertyContactForm