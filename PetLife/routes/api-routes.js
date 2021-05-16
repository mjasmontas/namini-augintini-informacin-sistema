const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: 'dpazzzpts',
  api_key: '182283433577744',
  api_secret: "w1HqNKINbiOu0ewT0o2qxaHmGrs"
});

module.exports = function(app) {
  app.post("/api/image-upload", (req, res) => {
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image.path)
    );

    Promise.all(promises)
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
  }); 
};
