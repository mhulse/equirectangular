const path = require('path');
const untildify = require('untildify');

module.exports = {

  resolvePath: (target) => {

    return path.resolve(untildify(target));

  },

};

