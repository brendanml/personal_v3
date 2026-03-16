const { Schema, model } = require("mongoose")

const SchoolSchema = new Schema({
    name: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    url: { type: String, required: true },
    courses: [{ type: String }],
    transcript: { type: String, default: null },
}, { _id: false })

const ProfileSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: true },
    born: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    school: { type: SchoolSchema, required: true },
    about: {
        fun: { type: String, required: true },
        technical: { type: String, required: true },
    },
    tag: {
        fun: { type: String, required: true },
        technical: { type: String, required: true },
    },
    socials: {
        linkedin: { type: String },
        youtube: { type: String },
        email: { type: String },
        github: { type: String },
    },
    skills: {
        languages: [{ type: String }],
        frontend: [{ type: String }],
        backend: [{ type: String }],
        databases: [{ type: String }],
        testing: [{ type: String }],
        tools: [{ type: String }],
    },
})

module.exports = model("Profile", ProfileSchema)
