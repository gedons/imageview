const multer = require('multer');
const Image = require('../models/image');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadImageController = async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await uploadImage(filePath);
    
    // Delete the temporary file after uploading to Cloudinary
    fs.unlinkSync(filePath);

    const image = new Image({ url: result.secure_url, public_id: result.public_id });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllImagesController = async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getImageByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) return res.status(404).json({ error: 'Image not found' });
  
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const deleteImageController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    await deleteImage(image.public_id);
    await Image.deleteOne({ _id: id });
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadImageController,
  getAllImagesController,
  getImageByIdController,
  deleteImageController,
  upload,
};
