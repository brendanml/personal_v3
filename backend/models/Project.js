const { Schema, model } = require("mongoose")

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["dev"], required: true },
    url: { type: String, default: null },
    github: { type: String, default: null },
    blog: { type: String, default: null },
    youtube: { type: String, default: null },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    description: { type: String },
    tags: [{ type: String }],
    importance: { type: String, enum: ["high", "medium", "low", "backlog"], default: "high" },
})

module.exports = model("Project", ProjectSchema)
