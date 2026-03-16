const { Schema, model } = require("mongoose")

const CertificationSchema = new Schema({
    name: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String },
    url: { type: String },
    type: { type: String, enum: ["dev"], default: "dev" },
    importance: { type: String, enum: ["high", "medium", "low", "backlog"], default: "high" },
    skills: [{ type: String }],
})

module.exports = model("Certification", CertificationSchema)
