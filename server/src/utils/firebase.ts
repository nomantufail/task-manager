import admin from 'firebase-admin'
import path from 'path'

const serviceAccount = require(path.resolve(__dirname, '../../serviceAccountKey.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const firebaseAdmin = admin
