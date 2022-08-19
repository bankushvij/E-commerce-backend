import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ details: { type: String }, for: { type: String } }],
        phoneNumber: [{ type: Number }],
    }
)


UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "myShop")
};

UserSchema.statics.findByEmailandPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    

    if (checkUserByEmail || checkUserByPhone) {
        console.log("yha aaya ");
        throw new Error("User already exists!");
    }

    return false;
};
// statics function use to encapsulated the moongose logic
UserSchema.statics.findByEmailandPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("user not find");

    }

    const doesPaswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPaswordMatch) {
        throw new Error("password invalid")
    }
    return user;
}






// pre function called before saving the data 
UserSchema.pre("save", function (next) {
    // save the details in this
    const user = this;


    // next function is called when we are done with our pre function 
    if (!user.isModified("password")) return next();


    // generating the salt 
    bcrypt.genSalt(8, (error, salt) => {
        // if error available return then
        if (error) return next(error);

        // generating the hash 
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            user.password = hash;
            return next();
        })
    })


})

export const UserModel = mongoose.models['User'] || mongoose.model("User", UserSchema);