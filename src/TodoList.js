'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	//add task
	handleAddTask_(event) {
		let newTask = {
			description: event.target.value,
			done: false
		}

		this.setUpdatedTask(this.tasks.length, newTask);

		//clear the field
		event.target.value = "";
	}

	//check task
	handleCheckTask_(event) {
		let index = this.getParentIndex(event);
		let tempTask = {
			description: this.tasks[index].description,
			done: !this.tasks[index].done
		}

		this.setUpdatedTask(index, tempTask);
	}

	//edit task
	handleEditTask_(event) {
		let index = this.getParentIndex(event);
		let tempTask = {
			description: this.tasks[index].description + " adriano",
			done: this.tasks[index].done
		}

		this.editTask = true;
		this.setState({ editTask: this.editTask });

		this.setUpdatedTask(index, tempTask);
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
		value: false
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
