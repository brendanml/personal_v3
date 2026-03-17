const { Schema, model } = require("mongoose")

const BookSchema = new Schema({
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, default: null },
    thoughts: { type: String, default: "" },
    progress: { type: Number, min: 0, max: 100, required: true },
    date: { type: String },
    article: { type: String, default: "" },
    persona: { type: String, enum: ["fun", "technical"] },
})

module.exports = model("Book", BookSchema)
