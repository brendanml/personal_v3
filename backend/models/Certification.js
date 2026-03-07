const { Schema, model } = require("mongoose")

const CertificationSchema = new Schema({
    name: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String },
    url: { type: String },
    persona: { type: String, enum: ["fun", "technical"] },
    skills: [{ type: String }],
})

module.exports = model("Certification", CertificationSchema)
