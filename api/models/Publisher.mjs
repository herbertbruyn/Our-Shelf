export default (mongoose, { enums, patterns }) => {
  const options = { timestamps: true };
  const schema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
      index: true
    },
    logo: {
      type: String,
      required: true,
      validate: val => patterns.URL.test(val) || patterns.DATA_URL.test(val)  
    },
    country: {
      type: String,
      required: true,
      enum: Object.keys(enums.COUNTRY)
    },
    province: {
      type: String,
      required: true,
      validate(val) {
        return enums.COUNTRY[this.country].includes(val);
      }
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
