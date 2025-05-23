// import multer from "multer";
import multer, { diskStorage } from "multer";
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/restaurant");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default { upload };
