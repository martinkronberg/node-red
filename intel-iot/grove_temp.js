module.exports = function(RED) {
    var m = require('mraa');
	var groveSensor = require('jsupm_grove');
	
	
    function grove_temp(n) {
        RED.nodes.createNode(this, n);
        this.pin = n.pin;
        this.interval = n.interval;
		//var temp = new groveSensor.GroveTemp(parseInt(this.pin));
		//this.x = temp.value();
        this.board = m.getPlatformName();
        var node = this;
        var msg = { topic:node.board+"/A"+node.pin };
        var old = -99999;
        
		var temp = new groveSensor.GroveTemp(0);
		
		this.timer = setInterval(function() {
            msg.payload = temp.value();
            node.send(msg);          
		   }, node.interval);

        this.on('close', function() {
            clearInterval(this.timer);
        });
    }
    RED.nodes.registerType("grove_temp", grove_temp);
}