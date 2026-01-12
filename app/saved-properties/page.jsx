import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/connectDB';
import User from '@/models/User'
import { getSessionUser } from '@/utils/functions'
import React from 'react'

const page = async () => {
    const session = await getSessionUser();
    await connectDB();

    if(!session || !session.userId){
        throw new Error('User not authenticated')
    }

    const userId = session.userId;

    const {bookmark} = await User.findById(userId).populate('bookmark');

    console.log(bookmark)
    if (!bookmark || bookmark.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        No Bookmarked Properties
      </div>
    );
  }
  return (
    <div className='p-4 md:p-8 lg:p-12'>
        <h1 className='text-3xl font-bold mb-6'>Bookmarked Properties</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                bookmark.map((property,idx) => (
                    <PropertyCard property={property} key={idx} />
                ))
            }
        </div>
    </div>
    )
}

export default page