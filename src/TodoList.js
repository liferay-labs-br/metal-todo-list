'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	newTask(event) {
		let newTask = {
			description: event.target.value,
			completed: false
		}

		this.setState({tasks: this.tasks.concat(newTask)});

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
