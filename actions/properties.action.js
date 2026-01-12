'use server'

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/connectDB";
import Property from "@/models/Property";
import User from "@/models/User";
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
        description: data.get('description'),
        type: data.get('type'),
        location: {
            street : data.get('location.street'),
            city: data.get('location.city'),
            state: data.get('location.state'),
            zipcode: data.get('location.zipcode'),
        },
        lat: Number(data.get('lat')),
        lng: Number(data.get('lng')),
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

export async function deleteProperty(propertyId){
    const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error('user not authenticated')
    }

    await connectDB();
    const property = await Property.findById(propertyId);

    if(!property){
        throw new Error('Property not found')
    }
    if(property.owner.toString() !== session.userId){
        throw new Error('Unauthorized')
    }

    

    const publicIds = property.images.map((imgUrl) => {
        const parts = imgUrl.split('/');
        const fileName = parts[parts.length -1];
        const publicId = fileName.split('.')[0];
        return `property-pulse/${publicId}`;
    });

    for (let publicId of publicIds){
        await cloudinary.uploader.destroy(publicId);
    }

    await Property.findByIdAndDelete(propertyId);

    revalidatePath('/','layout');
}

export async function getPropertyById(propertyId){
     const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error('user not authenticated')
    }

    await connectDB();
    const property = await Property.findById(propertyId);

    if(!property){
        throw new Error('Property not found')
    }
    if(property.owner.toString() !== session.userId){
        throw new Error('Unauthorized')
    }

    return property;

}

export async function updateProperty(propertyId, data){
    const ameneties = data.getAll('amenities') // Get all selected amenities

    const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error('user not authenticated')
    }   
    const userId = session.userId;

    await connectDB();
    const property =  await Property.findById(propertyId);

    if(!property){
        throw new Error('Property not found')
    }
    if(property.owner.toString() !== userId){
        throw new Error('Unauthorized')
    }
    property.name = data.get('name');
    property.dscription = data.get('description');
    property.type = data.get('type');
    property.location = {
        street : data.get('location.street'),
        city : data.get('location.city'),
        state : data.get('location.state'),
        zipcode : data.get('location.zipcode'),
    };
    property.beds = data.get('beds');
    property.baths = data.get('baths');
    property.square_feet = data.get('square_feet');
    property.amenities = ameneties;
    property.rates = {
        weekly : data.get('rates.weekly'),
        monthly : data.get('rates.monthly'),
        yearly : data.get('rates.yearly'),
    };
    property.seller_info = {
        name : data.get('seller_info.name'),
        email : data.get('seller_info.email'),
        phone : data.get('seller_info.phone'),
    };
    await property.save();
    revalidatePath('/','layout');   
    return redirect(`/properties/${property._id}`);
}


export async function toggeleBookmarkedProperty(propertyId){

    const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error('user not authenticated')
    }

    const userId = session.userId;

    await connectDB();
    const user = await User.findById(userId);

    const isBookmarked = user.bookmark.includes(propertyId);
    let message;
    let bookmarked;

    if(isBookmarked){
        user.bookmark = user.bookmark.filter(id => id.toString() !== propertyId.toString());
        message = 'bookmark removed';
        bookmarked = false;
    }else{
        user.bookmark.push(propertyId);
        message = 'bookmark add successfully';
        bookmarked = true;
    }

    await user.save();

    revalidatePath('/','page');

    return {
        message,bookmarked
    }
}

export async function checkBookmarkStatus(propertyId){

    const session = await getSessionUser();

    if(!session || !session.userId){
        throw new Error("User Not Authenticated")
    }

    const userId = session.userId;

    const user = await User.findById(userId);

    const isBookmarked = user.bookmark.includes(propertyId);
    return {isBookmarked};
}