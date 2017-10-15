'use strict';

import Toast from '../src/components/toast/Toast';

let toast;

describe('Toast', function() {
	it('should be pass correctly formatted configuration options to Toast.js', () => {
		toast = new Toast({
			text: ''
		});
	});
});
