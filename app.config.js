import 'dotenv/config';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

export default {
  name: 'teacherminichat',
  slug: 'teacherminichat',
  version: '1.0.0',
  icon: "./src/assets/logo.png",
  orientation: 'portrait',
  userInterfaceStyle: "light",
  hooks: {
    postPublish: []
  },
  splash: {
    image: "./src/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F0F0FF"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    bundleIdentifier: "me.calhau.teacherminichat",
    supportsTablet: false
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/logo.png",
      backgroundColor: "#FFFFFF"
    },
    package: "me.calhau.teacherminichat"
  },
  web: {
    favicon: "./src/assets/favicon.png"
  },
  extra: {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
  },
};