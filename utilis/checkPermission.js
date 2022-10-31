import { unAuthorized } from "../error/index.js";
export default function (userID, checkPermissionID) {
  if (userID.toString() === checkPermissionID) return;
  else throw new unAuthorized("this route is not allowed");
}
