import admin from 'firebase-admin'

const serviceAccount = require('../../../serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export const getFirestore = () => {
    return admin.firestore()
}

export const getAuth = () => {
    return admin.auth()
}
