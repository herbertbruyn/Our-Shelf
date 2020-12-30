import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default async () => {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };
  try { 
    let conn = await mongoose.connect(process.env.DATABASE, params);
    console.log(`MONGODB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log('Cannot connect to the database...', e); 
    process.exit(1); 
  }
}

