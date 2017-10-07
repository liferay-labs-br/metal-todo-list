'use strict';

import templates from './LoadingBar.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './loading-bar.scss';

class LoadingBar extends Component {
}

Soy.register(LoadingBar, templates);

export { LoadingBar };
export default LoadingBar;
