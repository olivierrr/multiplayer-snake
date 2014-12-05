pleasejs = require('pleasejs')

module.exports = function () {
  return pleasejs.make_color({
    golden: false,
    value: 1,
    saturation: 0.5
  })[0]
}
