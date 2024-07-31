const cloudinary = require('cloudinary').v2;
const { cloud_name, api_key, api_secret } = require('../config').cloudinary;


cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const uploadImage = (filePath) => {
  return cloudinary.uploader.upload(filePath, { folder: 'image-web-app' });
};

const deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteImage,
};
