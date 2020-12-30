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
      required: true
    },
    birthDate: {
      type: String,
      required: false,
      match: patterns.DATE
    },
    deathDate: {
      type: String,
      required: false,
      match: patterns.DATE
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
      maxlength: 1000,
    }
  }, options);
  return mongoose.model('Author', schema);
}

