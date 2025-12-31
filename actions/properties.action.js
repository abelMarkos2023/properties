'use server'

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/connectDB";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/functions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createProperty(data) {
    const ameneties = data.getAll('amenities') // Get all selected amenities
    const images = data.getAll('images').filter(image => image !== ''); // Get all uploaded images' names

    const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error('user not authenticated')
    }

    const userId = session.userId;
    const propertyData = {
        owner:userId,
        name: data.get('name'),
        dscription: data.get('description'),
        type: data.get('type'),
        location: {
            street : data.get('location.street'),
            city: data.get('location.city'),
            state: data.get('location.state'),
            zipcode: data.get('location.zipcode'),
        },
        beds: data.get('beds'),
        baths: data.get('baths'),
        square_feet: data.get('square_feet'),
        amenities: ameneties,
        rates: {
            weekly: data.get('rates.weekly'),
            monthly: data.get('rates.monthly'),
            yearly: data.get('rates.yearly'),
        },
        seller_info: {
            name: data.get('seller_info.name'),
            email: data.get('seller_info.email'),
            phone: data.get('seller_info.phone'),
        },
        
    }

    const imgFiles = [];

    for(const img of images){

        const imgBuffer = await img.arrayBuffer();
        const imgArray = new Uint8Array(imgBuffer);

        const imgData = Buffer.from(imgArray);

        const imgBase64 = imgData.toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imgBase64}`, {
            folder: 'property-pulse',
        });

        imgFiles.push(result.secure_url);
    }
    await connectDB();
     
    const newProperty = new Property(propertyData);

    newProperty.images = imgFiles;
   
    await newProperty.save();

    revalidatePath('/','layout');

    

    return redirect(`/properties/${newProperty._id}`);
}