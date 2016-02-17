module.exports = function(RED) {
var lcd = require('jsupm_i2clcd');
    function WriteToLCD(config) {
    var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
	RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {
		var r = parseInt(msg.payload.r);
		var g = parseInt(msg.payload.g);
		var b = parseInt(msg.payload.b);
		display.setColor(r, g, b);
        display.setCursor(0,0);
		display.write(String(msg.payload.text));    
		node.send(msg);
        });
    }
    RED.nodes.registerType("grove-lcd",WriteToLCD);
}