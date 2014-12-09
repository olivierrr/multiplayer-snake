
module.exports = {
  appendTo: appendTo,
  draw: draw,
  setColor: setColor
}

var $container = null
  , $canvas = document.createElement('canvas')
  , ctx = $canvas.getContext('2d')

window.addEventListener('resize', onresize)
function onresize() {
  $canvas.width = $container.offsetWidth
  $canvas.height = $container.offsetHeight
}

function appendTo (newContainer) {
  ($container = newContainer).appendChild($canvas)
  onresize()
}

/**
 * draws a square per 'slot'
 * color depends on model[x][y] value
 * grid size depends on model.length
 */
function draw (model) {
  if(!model) return

  var gridSize = model.length
  var smllst = ($canvas.width > $canvas.height ? $canvas.height : $canvas.width)
  var slotsize = ~~(smllst/gridSize)
  var size = slotsize * gridSize

  var verticalPadding = ~~($canvas.height/2 - size/2)
  var horizontalPadding = ~~($canvas.width/2 - size/2)

  ctx.fillStyle = '#9DAEB5'
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)

  var BLOCKS = {
    0: 'white',  // 'empty'
    1: '#333'    // 'food'
  }

  for(var i=0; i<model.length; i++) {
    for(var j=0; j<model[i].length; j++) {
      var color = BLOCKS[model[i][j]] || model[i][j]
      fillSlot(i, j, color)
    }
  }

  function fillSlot (x, y, color) {
    ctx.fillStyle = color || '#FF0000'
    ctx.fillRect(x*slotsize+1 + horizontalPadding, y*slotsize+1 + verticalPadding, slotsize-1, slotsize-1)
  }

}

function setColor (color) {
  if($container) $container.style.background = LightenDarkenColor(color, -95)
}

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}