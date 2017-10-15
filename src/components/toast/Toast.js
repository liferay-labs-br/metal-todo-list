'use strict';

import templates from './Toast.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import './toast.scss';

class Toast extends Component {}

Toast.STATE = {
	/**
	 * @instance
	 * @memberof Toast
	 * @type {string|undefined}
	 * @default check
	 */
	icon: Config.string().value('check'),

	/**
	 * @instance
	 * @memberof Toast
	 * @type {string}
	 */
	text: Config.string().required()
}

Soy.register(Toast, templates);

export { Toast };
export default Toast;
