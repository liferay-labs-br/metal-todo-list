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
}

TodoList.STATE = {
	tasks: {
		value: [
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor sollicitudin enim vitae imperdiet. Morbi et faucibus purus, at gravida justo. Proin in nisi molestie, consectetur mi a, eleifend augue. Sed mollis libero at fermentum hendrerit.',
				completed: false
			},
			{
				description: 'Cras pharetra sodales lorem, ac euismod felis consectetur ac. Pellentesque tempus sapien mauris, ut pharetra lacus porta in.',
				completed: true
			},
			{
				description: 'Ut diam enim, mollis id facilisis vel, pulvinar interdum elit.',
				completed: false
			}
		]
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
