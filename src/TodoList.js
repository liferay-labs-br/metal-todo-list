'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	newTask(event) {
		this.setState({tasks: this.tasks.concat(event.target.value)});

		event.target.value = "";
	}
}

TodoList.STATE = {
	tasks: {
		value: []
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
