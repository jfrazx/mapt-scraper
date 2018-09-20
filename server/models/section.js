const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  sectionIndex: {
    type: Number,
    required: true,
  },
  sectionID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
    },
  ],
});

module.exports = mongoose.model('Section', sectionSchema);
