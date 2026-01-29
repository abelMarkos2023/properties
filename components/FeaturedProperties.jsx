import connectDB from '@/config/connectDB'
import React from 'react'
import PropertyCard from './PropertyCard';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import Property from '@/models/Property';

const FeaturedProperties = async() => {

    await connectDB();

    const properties = await Property.find({ is_featured: true }).limit(4).lean();

    console.log('properties',properties)
  return properties.length > 0 ? ((
    <div className="bg-blue-50 p-8">
        <div className="container mx-auto">
            <h2 className="text-blue-400 text-2xl font-bold">Featured Properties

            </h2>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
                {properties.map((property) => (
                    <FeaturedPropertyCard key={property._id} property={property} /> 
                ))}
            </div>
        </div>
    </div>
  )) : null
}

export default FeaturedProperties