const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        liked_workouts: { 
            type: [Schema.Types.ObjectId],
            ref: "Workout"
        },
        liked_recipies: {
            type: [Schema.Types.ObjectId],
            ref: "Recipie"
        },
        liked_channels: {
            type: [Schema.Types.ObjectId],
            ref: "Channel"
        },
        calendarEntries: {
            type: [Schema.Types.ObjectId],
            ref: "CalendarEntry"
        },
        genre: {
            type: String,
            enum: ["male", "female"]
        },
        weight: {type: Number},
        height: {type: Number},
        goal: {
            type: String,
            enum: ["gain", "lose"]
        },
        planning: {
            type: Schema.Types.ObjectId,
            ref: "Workout"
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    }
);

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt  
            .hash(this.password, 2)
            .then((hash) => {
                this.password = hash
                next()
            })
            .catch(next)
    } else {
        next()
    }
})

userSchema.methods.checkPassword = function (pass) {
    return bcrypt.compare(pass, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;