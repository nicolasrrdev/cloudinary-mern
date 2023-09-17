import app from './app.js' 
import db from './db.js'

db()

const PORT = process.env.PORT || 4003
app.listen(PORT, () => {
  console.log('Products Server on port', PORT)
})