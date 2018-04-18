/*
    handling message between iframe and window
*/
class MessageService {

	/* @ngInject */
	constructor($timeout) {
		this.$timeout = $timeout;
	}

	on(messageId, callback) {
		window.addEventListener("message", (e) => {
			let msg = e.data;
			if (msg.id === messageId) {
				this.$timeout(function () {
					callback(msg.data);
				});
			}
		}, false);
	}

	send({
		id,
		data
	}) {
		window.parent.postMessage({
			id,
			data
		}, '*')
	}

	send() {

		if (arguments.length == 1) {
			let {
				id,
				data
			} = arguments[0];
			window.parent.postMessage({
				id,
				data
			}, '*')
		} else {
			let iframe = arguments[0];
			let {
				id,
				data
			} = arguments[1];

			if (typeof iframe === 'string') {
				iframe = document.getElementById(iframe);
			}
			if (iframe) {

				iframe.contentWindow.postMessage({
					id,
					data
				}, '*')
			}
		}

	}

}

export default MessageService
