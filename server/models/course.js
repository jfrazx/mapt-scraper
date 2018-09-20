const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    courseID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    publishedAt: {
      type: String,
      trim: true,
      default: 'No publication date found',
    },
    description: {
      type: String,
      trim: true,
      default: 'No description found',
    },
    style: {
      type: String,
      trim: true,
      default: 'No style data found',
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseSchema.pre('validate', function(next) {
  if (this.name.endsWith('[Video]')) {
    this.name = this.name.replace('[Video]', '');
  }

  next();
});

module.exports = mongoose.model('Course', courseSchema);
