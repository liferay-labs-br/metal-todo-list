'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import WeDeploy from 'wedeploy';
import './components/loading-bar/LoadingBar';
import './components/toast/Toast';

import './todo-list.scss';

const DB = 'https://db-todolist.wedeploy.io';
const PATH = 'tasks';

class TodoList extends Component {

	created() {
		this.setState({
			disable: true
		});

		WeDeploy.data(DB).get(PATH).then(tasks => {

			this.setState({
				disable: false,
				tasks: tasks
			});

		}).catch(error => {
			console.error(error);
		});
	}

	/**
	 * Add task
	 */
	handleAddTask_(event) {
		let eventTarget = event.delegateTarget;
		let index = this.tasks.length;
		let inputAdd = document.getElementById("inputAdd");

		this.setState({
			disable: true
		});

		WeDeploy.data(DB).create(PATH, {
			description: eventTarget.value,
			done: false,
			showEdit: false
		}).then(response => {

			console.log(response);

			this.tasks.splice(index, 1, response);

			this.setState({
				disable: false,
				tasks: this.tasks
			});

			//message
			this.toast(this.language.save);

			//clean input
			eventTarget.value = "";

			//set focus on input
			this.setFocus(inputAdd);

		}).catch(error => {
			console.log(error);
		});
	}

	handleEditTask_(event) {
		let eventTarget = event.delegateTarget;
		let task = this.getTask(eventTarget);
		let parent = eventTarget.parentNode.parentNode;
		let inputEdit = parent.querySelector('#inputEdit');

		task.showEdit = true;

		this.setState({
			tasks: this.tasks
		});

		//set focus on input
		this.setFocus(inputEdit);
	}

	/**
	 * Save edit task
	 */
	handleSaveEditTask_(event) {
		let eventTarget = event.delegateTarget;
		let task = this.getTask(eventTarget);

		task.description = eventTarget.value;
		task.showEdit = false;

		this.setState({
			disable: true
		});

		WeDeploy.data(DB).update(`${PATH}/${task.id}`, {
			description: eventTarget.value,
			showEdit: false
		}).then(response => {

			this.setState({
				tasks: this.tasks,
				disable: false
			});

			//message
			this.toast(this.language.update, 'pencil');

		}).catch(error => {
			console.error(error);
		});
	}

	/**
	 * Mark task as done
	 */
	handleDoneTask_(event) {
		let task = this.getTask(event.delegateTarget);

		this.setState({
			disable: true
		});

		WeDeploy.data(DB).update(`${PATH}/${task.id}`, {
			done: !task.done
		}).then(response => {

			task.done = !task.done;

			this.setState({
				tasks: this.tasks,
				disable: false
			});

			//message
			this.toast(this.language.done);

		}).catch(error => {
			console.error(error);
		});
	}

	/**
	 * Remove task
	 */
	handleRemoveTask_(event) {
		let eventTarget = event.delegateTarget;
		let index = this.getIndex(eventTarget);
		let parent = eventTarget.parentNode;
		let task = this.getTask(eventTarget);

		this.setState({
			disable: true
		});

		WeDeploy.data(DB).delete(`${PATH}/${task.id}`)
			.then(response => {

				this.tasks.splice(index, 1);
				this.setState({
					tasks: this.tasks,
					disable: false
				});

				//message
			this.toast(this.language.remove, 'trash');

			})
			.catch(function (error) {
				console.error(error);
			});
	}

	//get current task
	getTask(event) {
		return this.tasks[this.getIndex(event)];
	}

	//get current index
	getIndex(event) {
		return parseInt(event.getAttribute('data-index'));
	}

	//set focus on element
	setFocus(element) {
		setTimeout(() => {
			element.focus();
		}, 0);
	}

	//set message
	toast(text, icon) {
		let messages_ = {
			icon: icon || 'check',
			hide: false,
			text
		}

		this.messages.push(messages_);
		this.setState({
			messages: this.messages
		});

		console.log(this.messages);

		setTimeout(() => {

			messages_.hide = true;
			this.setState({
				messages: this.messages
			});

			console.log(this.messages);
		}, 5000);
	}

}

TodoList.STATE = {
	tasks: {
		value: []
	},
	disable: {
		value: false
	},
	messages: {
		value: []
	},
	language: {
		value: {
			done: 'Task successfully done',
			update: 'Task successfully updated',
			remove: 'Task successfully removed',
			save: 'Task successfully saved',
			title: 'Metal TodoList',
			addTask: 'Add a new task',
			notFound: 'Nothing here :/'
		}
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
