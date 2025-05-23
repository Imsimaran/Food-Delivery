function giveAccess(roles = []) {
  return (req, res, next) => {
    console.log("User Role:", req?.user?.role);
    if (roles.includes(req?.user?.role)) {
      next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
}

export default giveAccess;
