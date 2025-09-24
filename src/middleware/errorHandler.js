export const notFound = (req, res, next) => {
res.status(404);
res.json({ message: `Not Found - ${req.originalUrl}` });
};


export const errorHandler = (err, req, res, next) => {
console.error(err.stack);
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
res.status(statusCode).json({ message: err.message });
};