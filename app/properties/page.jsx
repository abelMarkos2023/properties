import React from 'react'

import Image from 'next/image'
import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/connectDB'
import Property from '@/models/Property'
import Pagination from '@/components/Pagination'

const PropertiesPage = async ({searchParams}) => {

  await connectDB();
  const PER_PAGE = 5;

  const totalDocument = await Property.countDocuments();
  


  const {page} = await searchParams || 1;

  const totalPages = Math.ceil(totalDocument / PER_PAGE);

  const skip = page && page > 1 && page <= totalPages ? (page - 1) * PER_PAGE : 0;

    


  


  const properties = await Property.find({}).skip(skip).limit(PER_PAGE).lean();
  console.log(properties)
  return (
    <div className="px-4 py-6">
      <div className="container-xl lg:container mx-auto mt-12">
      {
        properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
            properties.map((property) => (
              <PropertyCard property = {property} key={property._id}/>
                  ))
      }
          </div>
        )
      }

      <div className="mt-8 flex justify-center">
        <Pagination page={parseInt(page) || 1} totalPages={totalPages} />
      </div>
    </div>
    </div>
  )
}

export default PropertiesPage