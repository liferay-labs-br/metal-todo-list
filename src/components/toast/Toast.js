'use strict';

import templates from './Toast.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './toast.scss';

class Toast extends Component {
}

Soy.register(Toast, templates);

export { Toast };
export default Toast;
