function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const token = authHeader.slice(7)
    if (token !== process.env.API_SECRET) {
        return res.status(403).json({ error: "Forbidden" })
    }

    next()
}

module.exports = { requireAuth }
