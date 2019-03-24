module.exports = {

  ['check for system dep']: (dep) => {

    // Will return string `true` in object `stdout` key, or empty string otherwise:
    return `
      if [ ! -z "$(which ${dep})" ]; then
        echo true
      fi
    `;

  },

  ['make panorama']: (args) => {

    return `
      magick \
      montage \
      +frame \
      +shadow \
      -tile ${args.cols}x${args.rows} \
      -geometry ${args.tile_width}x${args.tile_height}+0+0 \
      "${args.input}" \
      +depth \
      miff:- \
      | \
      magick \
      - \
      -quality 100 \
      -crop ${args.crop_width}x${args.crop_height}+0+0 \
      "${args.output}"
    `;

  },

};
