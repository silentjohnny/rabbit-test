var amqp = require('amqp'),
	debug = require('debug')('notificare:rabbitClient');
	connection = amqp.createConnection({ host: "localhost", port: 5672 });


var sendMessage = function(exchange, payload) {
    var encoded_payload = JSON.stringify(payload); 

};


connection.on('ready', function () {
	debug('Connection ready');
	connection.queue('my-queue', {durable: true}, function(queue) {
		for (var i=0; i< 1; i++) {
			debug('Sending message: %s', i);
		    connection.publish({ping: i}, {deliveryMode: 2}, function(delivered) {
		    	console.log(delivered);
		    });
		}
	});
});