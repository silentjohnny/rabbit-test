var amqp = require('amqp'),
debug = require('debug')('notificare:rabbitWorker');

var connection = amqp.createConnection({ host: "localhost", port: 5672});

connection.on('ready', function () {
	connection.queue("my-queue", {
		autoDelete: false, 
		durable: true
	}, function(queue){
		debug('Bound to queue %s', queue.name);
//		queue.bind('service-central-exchange', '#', function(queue) {
//			debug('Bound queue %s', queue.name);
//		});
		
		queue.subscribe({
			ack: true,
			prefetchCount: 1
		}, function (data, headers, info, message) {
			debug('Received a message: %s', data.ping);
			message.acknowledge();
		});
	});
});