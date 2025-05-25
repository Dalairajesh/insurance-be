const multer = require('multer');
const router = require('express').Router()
const {uploadCSVFile, searchUser, aggregatedPloicy} = require("../controllers/policy.controller")
const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), uploadCSVFile)
router.get('/search/:username', searchUser)
router.get('/aggregated-policies',aggregatedPloicy)

module.exports = router