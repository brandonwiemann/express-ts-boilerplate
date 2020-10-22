export default {
    'origin': process.env.CLIENT_URL,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    'credentials': true
}