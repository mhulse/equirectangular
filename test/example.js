const equirectangular = require('../index');

const options = {
  crop: {
    width: 10240,
    height: 5120,
  },
  tile: {
    width: 512,
    height: 512,
  },
  rows: 10,
  cols: 20,
  image_key: 'AF1QipMspd7xEt_zPak1U5R3z250U9tOLpPy_1L6aNsA'
};

(async () => {

  const pano = await equirectangular(options);

  console.log(pano);

})();


