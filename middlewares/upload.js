const multer  = require('multer');
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
    destination: tempDir,
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage, limits: {fieldSize: 2000000} });

module.exports = { upload };