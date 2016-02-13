
export const port = process.env.PORT || 5000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const hostAddress = process.env.WEBSITE_ADDRESS || `http://${host}`;
