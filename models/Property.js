import { Mongoose,Schema,model,models } from "mongoose";

const propertySchema = new Schema(
    {
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        street:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        zipcode:{type:String,required:true},
        
    },
    beds:{type:Number,required:true},
    baths:{type:Number,required:true},
    square_feet:{type:Number,required:true},
    amenities:[String],
    rates:{
        nightly:{type:Number},
        weekly:{type:Number},
        monthly:{type:Number},
    },
    seller_info:{
        name:{type:String},
        email:{type:String},
        phone:{type:String},
    },
    images:[String],
    is_featured:{type:Boolean,default:false},
    lat:{type:Number,required:true},
    lng:{type:Number,required:true},
},{
    timestamps:true
});

const Property = models.Property || model("Property",propertySchema);

export default Property;