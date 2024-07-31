const express = require('express');
const { uploadImageController,  getAllImagesController, getImageByIdController, deleteImageController, upload } = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', upload.single('image'), uploadImageController);
router.get('/', getAllImagesController);
router.get('/:id', getImageByIdController);
router.delete('/:id', deleteImageController);

module.exports = router;
