'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	handleAddTask_(event) {
		let index = this.tasks.length;
		let tempTask = {
			description: event.delegateTarget.value,
			done: false,
			showEdit: false
		}

		this.tasks.splice(index, 1, tempTask);
		this.setState({
			tasks: this.tasks
		});

		event.delegateTarget.value = "";
	}

	handleEditTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.showEdit = true;

		this.setState({
			tasks: this.tasks
		});
	}

	handleSaveEditTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.description = event.delegateTarget.value;
		task.showEdit = false;

		this.setState({
			tasks: this.tasks
		});
	}

	//remove task
	handleRemoveTask_(event) {
		let index = this.getParentIndex(event);

		this.setRemovedTask(index);
	}

	//get the parent index
	getParentIndex(event) {
		return parseInt(event.target.parentNode.parentNode.getAttribute("data-index"));
	}

	//update task in array
	setUpdatedTask(index, task) {
		this.tasks.splice(index, 1, task);
		this.updateTasks();
	}

	//remove task in array
	setRemovedTask(index) {
		this.tasks.splice(index, 1);
		this.updateTasks();
	}

	//update tasks
	updateTasks() {
		this.setState({ tasks: this.tasks });

		//show console tasks
		console.log(this.tasks);
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
	editTask: {
		value: {
			description: '',
			index: 0,
			show: false
		}
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
