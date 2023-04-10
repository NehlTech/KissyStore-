const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
// const fs = require("fs");
// const token = require("jsonwebtoken");
// const sendMail = require("../utils/sendMail");
// const filename = req.file.filename;

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          // console.log(err);
          res.status(500).json({ message: "Deleting a file err" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});
//     const activationToken = createActivationToken(user);
//     const activationUrl = `http://localhost:3000/activation/${activationToken}`;

//     try {
//       await sendMail({
//         email: user.email,
//         subject: "Account activation",
//         message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
//       });
//       res.status(201).json({
//         success: true,
//         message: `${user.name}, please check your mail: - ${user.email} to activate your account`,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

// // activation token creation
// const createActivationToken = (user) => {
//   return token.sign(user, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// // user activation

module.exports = router;
