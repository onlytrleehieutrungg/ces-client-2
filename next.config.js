/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
])

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://minimal-assets-api-dev.vercel.app',
    LOCAL_HOST_API_KEY: 'https://localhost:7077',
    CES_HOST_DEV_API_KEY: 'https://api-dev.ces.bio/api',
    CES_HOST_PROD_API_KEY: 'https://api.ces.bio/api',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: 'AIzaSyB6qCy9IgV23l07r0sv_eh-oRsG4qJlxOI',
    FIREBASE_AUTH_DOMAIN: 'my-storage-ces.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'my-storage-ces',
    FIREBASE_STORAGE_BUCKET: 'my-storage-ces.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '502920115519',
    FIREBASE_APPID: '1:502920115519:web:d74a884e3d778dfa624f8a',
    FIREBASE_MEASUREMENT_ID: 'G-FVNFRS9WHD',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
  },
})
