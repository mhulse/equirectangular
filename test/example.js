const Equirectangular = require('../index');

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
  input: './test/tiles/tile_*',
  output: './test/AF1QipMspd7xEt_zPak1U5R3z250U9tOLpPy_1L6aNsA.jpg',
};

(async () => {

  console.log('before');

  try {

    const pano = await new Equirectangular(options);
    console.log(pano);

  } catch(err) {

    console.error(err);

  }

  console.log('after');

})();


