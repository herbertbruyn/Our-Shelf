export default (mongoose, { patterns, enums }) => {
  const options = { timestamps: true };
  const schema = new mongoose.Schema({
    isbn10: {
      type: String,
      required: true,
      match: patterns.ISBN10,
      index: true
    },
    isbn13: {
      type: String,
      required: true,
      match: patterns.ISBN13,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      index: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    coverImage: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true,
      trim: true,
      enum: enums.FORMAT
    },
    language: {
      type: String,
      required: true,
      trim: true,
      enum: enums.LANGUAGE
    },
    authors: [{
      type: String,
      required: true
    }],
    publishers: [{
      type: String,
      required: true
    }],
    edition: {
      type: String,
      required: true,
      maxlength: 50
    },
    pages: {
      type: Number
    },
    publishYear: {
      type: Number
    },
    publishDate: {
      type: String,
      trim: true,
      required: true,
      match: patterns.DATE
    },
    private: {
      type: Boolean,
      required: true
    },
    stars: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
      default: 0
    },
    type: {
      type: String,
      required: true,
      enum: enums.TYPE
    },
    subtypes: [{
      type: String,
      required: true,
      validate: {
        validator: (val) => enums.FICTION.includes(val) || enums.NON_FICTION.includes(val),
      }
    }],
    keywords: [String],
    owner: {
      type: String,
      required: true,
      match: patterns.EMAIL
    },
    ownersReview: {
      type: String,
      required: false,
      maxlength: 5000      
    }
  }, options);

  return mongoose.model('Book', schema);
}
