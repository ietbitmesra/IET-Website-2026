export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const rawStatus = err.status || err.statusCode;
    const status =
        Number.isInteger(rawStatus) && rawStatus >= 400 && rawStatus < 600
            ? rawStatus
            : 500;

    let clientMessage = 'An internal server error occurred.';

    if (status === 400 && (err instanceof SyntaxError || err.type === 'entity.parse.failed')) {
        clientMessage = 'Invalid JSON payload.';
    } else if (status === 413 || err.type === 'entity.too.large') {
        clientMessage = 'Request body is too large.';
    } else if (status === 403 && err.message === 'Not allowed by CORS') {
        clientMessage = 'Not allowed by CORS policy.';
    } else if (status < 500 && err.message) {
        clientMessage = err.message;
    }

    console.error('Request error:', {
        method: req.method,
        path: req.path,
        status,
        message: err.message,
    });

    res.status(status).json({
        success: false,
        message: clientMessage,
    });
}