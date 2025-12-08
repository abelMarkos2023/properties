import React from 'react'

import Image from 'next/image'
import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/connectDB'
import Property from '@/models/Property'

const PropertiesPage = async () => {

  await connectDB();

  const properties = await Property.find({}).lean();

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
    </div>
    </div>
  )
}

export default PropertiesPage