import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetail from "@/components/PropertyDetail";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/connectDB";
import Property from "@/models/Property";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const page = async ({ params }) => {
  await connectDB();

  const { id } = await params;

  const propertyDoc = await Property.findById(id).lean();

  const property = JSON.parse(JSON.stringify(propertyDoc));

  if (!property) return notFound();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
            {/* <!-- Property Details --> */}
            <div className="md:col-span-2">
                <PropertyDetail property={property} />

                {/* Map goes here */}
            </div>
            
          <aside className="space-y-4">
             <BookmarkButton property={property} />
          <ShareButtons property={property} />
          <PropertyContactForm property={property} />
          </aside>
          </div>
          <PropertyImages images={property.images} />
        </div>
      </section>
    </>
  );
};

export default page;
