function middleware(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
	next()
}

module.exports = middleware