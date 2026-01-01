import { getPropertyById } from '@/actions/properties.action';
import PropertyEditForm from '@/components/PropertyEditForm';
import React from 'react'

const page = async ({params}) => {

    const {id} = await params;

    const propertyDoc = await getPropertyById(id);
    const property = JSON.parse(JSON.stringify(propertyDoc));

    if(!propertyDoc){
        return notFound();
    }

  return (
     <section className="bg-blue-100">
        <div className="max-w-4xl mx-auto p-24 rounded-lg">
            <div className="bg-white rounded-lg shadow-lg  p-6 m-4">
                <PropertyEditForm property={property} />
            </div>
        </div>
    </section>
  )
}

export default page