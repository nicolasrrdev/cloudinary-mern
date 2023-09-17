import 'dotenv/config'
import mongoose from 'mongoose'

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

export default db