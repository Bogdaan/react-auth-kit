
export const databaseDsn = process.env.DB || 'mysql://myapp:myapp@localhost/myapp';

// session key
export const crypto = '---- place here ----';

// passport-google config
export const GOOGLE_CLIENT_ID = '---- place here ----';
export const GOOGLE_CLIENT_SECRET = '---- place here ----';

// passport-facebook config
export const FACEBOOK_APP_ID = '---- place here ----';
export const FACEBOOK_APP_SECRET = '---- place here ----';

// passport-twitter config
export const TWITTER_CONSUMER_KEY = '---- place here ----';
export const TWITTER_CONSUMER_SECRET = '---- place here ----';

export {port, host, hostAddress} from './config.client';
