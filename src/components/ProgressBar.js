'use strict';

import templates from './ProgressBar.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './progress-bar.scss';

class ProgressBar extends Component {
}

Soy.register(ProgressBar, templates);

export { ProgressBar };
export default ProgressBar;
