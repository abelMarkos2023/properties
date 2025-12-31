import PropertyAddForm from '@/components/PropertyAddForm'
import React from 'react'

const AddPropertiesPage = () => {
  return (
    <section className="bg-blue-100">
        <div className="max-w-4xl mx-auto p-24 rounded-lg">
            <div className="bg-white rounded-lg shadow-lg  p-6 m-4">
                <PropertyAddForm />
            </div>
        </div>
    </section>
  )
}

export default AddPropertiesPage