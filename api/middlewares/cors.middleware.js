function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "content-type,authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");

  if (req.method === 'OPTIONS') {
    res.status(200).send()
  } else {
    next();
  }
}

module.exports = cors;