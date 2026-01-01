"use client";

import { deleteProperty } from "@/actions/properties.action";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if(!confirmDelete) return;

    await deleteProperty(propertyId);

    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );

    setProperties(updatedProperties);
    toast.success("Property deleted successfully");
  };
  return (
    <section>
      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no properties listed.
        </p>
      ) : (
        properties.map((property) => (
          <div key={property._id} className="mb-10">
            <Link href={`/properties/${property._id}`}>
              <Image
                className="h-40 w-full rounded-md object-cover"
                width={1000}
                height={1000}
                src={property.images[0].startsWith('http') ? property.images[0] : `/properties/${property.images[0]}`}
                alt="Property 1"
              />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.title}</p>
              <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state}</p>
            </div>
            <div className="mt-2">
              <a
                href={`/properties/${property._id}/edit`}
                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
              >
                Edit
              </a>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                type="button"
                onClick = {() => handleDeleteProperty(property._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ProfileProperties;
