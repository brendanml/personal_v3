const { Schema, model } = require("mongoose")

const JobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    url: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    years: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    persona: { type: String, enum: ["fun", "technical"] },
})

module.exports = model("Job", JobSchema)
