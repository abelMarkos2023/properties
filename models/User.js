import { Mongoose,Schema,model,models } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    bookmark:[
        {
        type:[Schema.Types.ObjectId],
        ref:"Property",
        
    }
    ]
},{
    timestamps:true
});

const User = models.User || model("User",userSchema);

export default User;