export default (mongoose) => {
  const options = { timestamps: true };
  const schema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
      index: true
    },
    country: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    city: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  }, options);
  return mongoose.model('Publisher', schema);
}
