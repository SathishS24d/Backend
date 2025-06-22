export default function Logger(req, res, next) {
    //log all request details
    console.log(`${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    next();
}
