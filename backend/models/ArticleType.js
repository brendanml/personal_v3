const { Schema, model } = require("mongoose")

const ArticleTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = model("ArticleType", ArticleTypeSchema)
