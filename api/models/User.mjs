export default (mongoose, { patterns }) => {
  const options = { timestamps: true };
  const schema = new mongoose.Schema({
    sub: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    given_name: {
      type: String,
      required: true
    },
    family_name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: patterns.EMAIL,
      index: true,
      unique: true
    },
    email_verified: {
      type: Boolean,
      required: false,
      default: false
    },
    locale: {
      type: String,
      required: false,
      default: 'en-US'
    },
    collectionName: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 50,
      index: true,
      unique: true,
      default: function() {
        return `${this.given_name}'s Collection`
      }
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000
    },
    interests: {
      type: [{
        type: String,
        minlength: 5,
        maxlength: 30
      }],
      required: false
    },
    birthDate: {
      type: String,
      trim: true,
      required: false,
      match: patterns.DATE
    }
  }, options);
  return mongoose.model('User', schema);
}
