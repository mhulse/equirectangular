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
  tiles: './test/tiles',
  output: './test',
  file: 'AF1QipMspd7xEt_zPak1U5R3z250U9tOLpPy_1L6aNsA',
};

(async () => {

  console.log('before');

  const pano = await new Equirectangular(options);

  console.log(pano);

  console.log('after');

})();


