'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {
	handleAddTask_(event) {
		let newTask = {
			description: event.target.value,
			done: false
		}

		this.setState({tasks: this.tasks.concat(newTask)});

		event.target.value = "";
	}

	handleCheckTask_(event) {
		let index = event.delegateTarget.getAttribute("data-index");
		let tempTask = {
			description: this.tasks[index].description,
			done: !this.tasks[index].done
		}

		this.tasks.splice(index, 1, tempTask);
		this.setState({tasks: this.tasks});
	}

	handleRemoveTask_(event) {
		let index = event.target.getAttribute("data-index");

		this.tasks.splice(index, 1);
		this.setState({tasks: this.tasks});
	}
}


TodoList.STATE = {
	tasks: {
		value: [
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor sollicitudin enim vitae imperdiet. Morbi et faucibus purus, at gravida justo. Proin in nisi molestie, consectetur mi a, eleifend augue. Sed mollis libero at fermentum hendrerit.',
				done: false
			},
			{
				description: 'Cras pharetra sodales lorem, ac euismod felis consectetur ac. Pellentesque tempus sapien mauris, ut pharetra lacus porta in.',
				done: true
			},
			{
				description: 'Ut diam enim, mollis id facilisis vel, pulvinar interdum elit.',
				done: false
			}
		]
	},
	removedTasks: {
		value: []
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
