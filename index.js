const exec = require('await-exec');
const { commands, util } = require('./lib');

module.exports = class Equirectangular {

  constructor(options = {}) {

    this._options = options;

    return this.init();

  }

  async init() {

    const o = this._options;

    const dep = 'magick';
    const check = await exec(
      commands['check for system dep'](dep)
    );

    if ( ! (check && check.stdout && check.stdout.toString().trim().length)) {
      throw new TypeError(`System dependency not installed: \`${dep}\``);
    }

    if ( ! (o.crop && util.isObject(o.crop) && (Object.keys(o.crop).length === 2))) {
      throw new TypeError(`Expected \`crop\` to be an object literal with two keys, got \`${o.crop}\` (${typeof o.crop})`);
    }

    if ( ! ((typeof o.crop.width === 'number') && (typeof o.crop.height === 'number'))) {
      throw new TypeError(`Expected \`crop.width\` and \`crop.height\` to be numbers, got \`${o.crop.width}\` (${typeof o.crop.width}) and \`${o.crop.height}\` (${typeof o.crop.height}) respectively`);
    }

    if ( ! (o.tile && util.isObject(o.tile) && (Object.keys(o.tile).length === 2))) {
      throw new TypeError(`Expected \`tile\` to be an object literal with two keys, got \`${o.tile}\` (${typeof o.tile})`);
    }

    if ( ! ((typeof o.tile.width === 'number') && (typeof o.tile.height === 'number'))) {
      throw new TypeError(`Expected \`tile.width\` and \`tile.height\` to be numbers, got \`${o.tile.width}\` (${typeof o.tile.width}) and \`${o.tile.height}\` (${typeof o.tile.height}) respectively`);
    }

    if ( ! (typeof o.rows === 'number')) {
      throw new TypeError(`Expected \`rows\` to be a number, got \`${o.rows}\` (${typeof o.rows})`);
    }

    if ( ! (typeof o.cols === 'number')) {
      throw new TypeError(`Expected \`cols\` to be a number, got \`${o.cols}\` (${typeof o.cols})`);
    }

    if ( ! ((typeof o.input === 'string') && (o.input.length > 0) && await util.pathExists(o.input, true))) {
      throw new TypeError(`Expected \`input\` to be a string and resolve to a path that exists, got \`${o.input}\` (${typeof o.input})`);
    }

    if ( ! ((typeof o.output === 'string') && (o.output.length > 0) && await util.pathExists(o.output, true))) {
      throw new TypeError(`Expected \`output\` to be a string and resolve to a path that exists, got \`${o.output}\` (${typeof o.output})`);
    }

    return this.main();

  };

  async main() {

    const o = this._options;

    const magick = await exec(
      commands['make panorama']({
        rows: o.rows,
        cols: o.cols,
        tile_width: o.tile.width,
        tile_height: o.tile.height,
        crop_width: o.crop.width,
        crop_height: o.crop.height,
        input: util.resolvePath(o.input),
        output: util.resolvePath(o.output),
      })
    );

    const stderr = magick.stderr.toString().trim();

    if (stderr) {
      throw new Error(stderr);
    } else {
      return magick.stdout.toString().trim();
    }

  };

};


