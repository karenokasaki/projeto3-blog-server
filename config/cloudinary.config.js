<<<<<<< HEAD
=======
// config/cloudinary.config.js

>>>>>>> 9a09d0cdc2b612142725bd1853fd1902830c3718
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
<<<<<<< HEAD
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "blog-85-wd",
  },
});

=======
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "blog", // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
});

//                     storage: storage
>>>>>>> 9a09d0cdc2b612142725bd1853fd1902830c3718
module.exports = multer({ storage });
