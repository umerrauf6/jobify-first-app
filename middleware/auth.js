import unAuthorized from "../error/unAuthorized.js";
import jsonwebtoken from "jsonwebtoken";

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unAuthorized("Token not valid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const valid = await jsonwebtoken.verify(token, process.env.SCRETE_KEY);
    req.user = { userID: valid.userID };
    next();
  } catch (err) {
    throw new unAuthorized("not valid");
  }
}
