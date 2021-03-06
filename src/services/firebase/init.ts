// Load Firebase configuration and initialize app + analytics

import firebase from 'firebase/app'
import 'firebase/analytics'
import { firebaseConfig, PRODUCTION_ONLY } from '../../config/firebase'

const initializeFirebase = () => {
  if (firebaseConfig) {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
}

if (
  process.env.NODE_ENV !== 'test' &&
  (process.env.NODE_ENV === 'production' || !PRODUCTION_ONLY)
) {
  initializeFirebase()
}
