import PropertyCard from '@/components/PropertyCard';
import PropertySearch from '@/components/PropertySearch';
import connectDB from '@/config/connectDB';
import Property from '@/models/Property';
import Link from 'next/link';
import React from 'react'
import { FaArrowAltCircleLeft, FaArrowCircleLeft } from 'react-icons/fa';

const page = async({searchParams}) => {
        const {location,propertyType} = await searchParams;


    await connectDB();

    const patterns = new RegExp(location, 'i');

    const query = {
        $or:[
            {name: patterns},
            {title: patterns},
            {'location.country': patterns},
            {'location.city': patterns},
            {'location.state': patterns},
            {'location.zipCode': patterns},
        ]
    }

    if(propertyType && propertyType !== 'All'){
        query.propertyType = propertyType;
    }

    const propertyDoc = await Property.find(query).lean();

    const propertyResult = JSON.parse(JSON.stringify(propertyDoc));

    console.log(propertyResult)
  return (
    <>
        <section className="bg-blue-700">
            <div className="max-w-7xl flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <PropertySearch />
            </div>
             </section>
            <section className='flex items-start text-blue-400 '>
               <div className=" p-4">
                 <Link href = '/properties' className='flex items-center text-blue-400 hover:underline'>
                   <FaArrowAltCircleLeft  className='mr-2'/> Go back 
                </Link>
               </div>
</section>
               <h1 className="text-lg mx-auto p-6 font-bold">
                Search Results
               </h1>

               {
                propertyResult.length === 0 ? (
                    <p className="p-8 m-4 text-gray-600">No properties found matching your criteria.</p>
                ) : (
                    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        propertyResult.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))
                    }
                </div>
                )
               }
            
       
    </>
  )
}

export default page