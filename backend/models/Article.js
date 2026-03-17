const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    date: { type: String, default: "" },
    tags: { type: [String], default: [] },
    thumbnail: { type: String, default: null },
    published: { type: Boolean, default: false },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: null },
})

module.exports = mongoose.model("Article", ArticleSchema)
