const exec = require('await-exec');
const commands = require('./lib/commands');
const util = require('./lib/util');

module.exports = async (options = {}) => {

  const magick = await exec(
    commands['make panorama']({
      rows: options.rows,
      cols: options.cols,
      tile_width: options.tile.width,
      tile_height: options.tile.height,
      tiles: options.tiles || util.resolvePath('./test/tiles'),
      crop_width: options.crop.width,
      crop_height: options.crop.height,
      output: options.output || util.resolvePath('./test'),
      file: options.image_key,
    })
  );

  const stderr = magick.stderr.toString().trim();

  if (stderr) {
    throw new Error(stderr);
  } else {
    return magick.stdout.toString().trim();
  }

};


