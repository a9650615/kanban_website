// See: https://github.com/zeit/next.js#custom-configuration
module.exports = {
  distDir: "build",
};

const withImages = require("next-images");

module.exports = withImages();
