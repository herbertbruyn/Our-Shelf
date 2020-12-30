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
    authors: [mongoose.Schema.ObjectId],
    publishers: [mongoose.Schema.ObjectId],
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
      require: true,
      enum: enums.TYPE
    },
    subtypes: [{
      type: String,
      require: true,
      validate: {
        validator: (val, props) => enums[props.type].indexOf(val) >= 0,
        propsParameter: true 
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
