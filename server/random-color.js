pleasejs = require('pleasejs')

module.exports = function () {
  return pleasejs.make_color({
    golden: true,
    value: 1,
    saturation: 0.5
  })[0]
}
