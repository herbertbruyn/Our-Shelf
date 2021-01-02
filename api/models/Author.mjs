export default (mongoose, { patterns }) => {
  const options = { timestamps: true };
  const schema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50,
      index: true,
      unique: true
    },
    picture: {
      type: String,
      required: true,
      validate: val => patterns.URL.test(val) || patterns.DATA_URL.test(val)  
    },
    birthYear: {
      type: String,
      required: false,
      match: patterns.YEAR
    },
    birthBC: {
      type: Boolean,
      default: false
    },
    deathYear: {
      type: String,
      required: false,
      match: patterns.YEAR
    },
    deathBC: {
      type: Boolean,
      default: false
    },
    birthPlace: {
      type: String,
      trim: true,
      required: false,
      maxlength: 50,
    },
    deathPlace: {
      type: String,
      trim: true,
      required: false,
      maxlength: 50,
    },
    shortBiography: {
      type: String,
      required: false,
      maxlength: 5000,
    }
  }, options);
  return mongoose.model('Author', schema);
}

