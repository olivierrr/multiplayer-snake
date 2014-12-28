var COLORS = ['#2ecc71', '#3498db', '#9b59b6', '#1abc9c', '#e67e22',  
  '#D24D57', '#674172', '#D2527F', '#BE90D4', '#4183D7', '#336E7B', 
  '#2574A9', '#26A65B', '#1BA39C', '#4DAF7C', '#F2784B', '#F5AB35']

module.exports = function () {
  return COLORS[~~(Math.random()*COLORS.length)]
}
