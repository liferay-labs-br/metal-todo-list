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
	handleClick_(event) {
		let task = event.delegateTarget;
		let index = task.getAttribute('data-index');

		let completed = this.tasks[index].completed;

		let _tasks = this.tasks.map((task, i) => {
			if(i == index) {
				if(task.completed) {
					task.completed = false;
				} else {
					task.completed = true;
				}
			}

			return task;
		});

		this.setState({ tasks: _tasks });
}

TodoList.STATE = {
	tasks: {
		value: []
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
