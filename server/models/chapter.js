const mongoose = require('mongoose');
const { Schema } = mongoose;

const chapterSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  chapterIndex: {
    type: Number,
    required: true,
  },
  chapterID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    default: 'No description information found',
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  video: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Chapter', chapterSchema);
