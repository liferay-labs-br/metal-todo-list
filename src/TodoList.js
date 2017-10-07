'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import WeDeploy from 'wedeploy';
import './components/loading-bar/LoadingBar';
import Toast from './components/toast/Toast';

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
				disable: false
			});

			this.setState({
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
		let inputAdd = document.querySelector("#inputAdd");

		this.setState({
			disable: true
		});

		WeDeploy.data(DB).create(PATH, {
			description: eventTarget.value,
			done: false,
			showEdit: false
		}).then(response => {

			this.setState({
				disable: false
			});

			this.tasks.splice(index, 1, response);
			this.setState({
				tasks: this.tasks
			});

			//message
			this.setMessage('task saved successfully');

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
		let parent = eventTarget.parentNode;
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
				tasks: this.tasks
			});

			this.setState({
				disable: false
			});

			//message
			this.setMessage('task edited successfully');

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
				tasks: this.tasks
			});

			this.setState({
				disable: false
			});

			//message
			this.setMessage('task marked successfully completed');

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
					tasks: this.tasks
				});

				this.setState({
					disable: false
				});

				//message
			this.setMessage('task removed successfully');

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
	setMessage(message) {

		this.messageLog.push(message);
		this.setState({
			messageLog: this.messageLog
		});

		setTimeout(() => {
			this.messageLog.shift();
			this.setState({
				messageLog: this.messageLog
			});

		}, 10000);
	}

}

TodoList.STATE = {
	tasks: {
		value: []
	},
	disable: {
		value: false
	},
	messageLog: {
		value: []
	}
}

Soy.register(TodoList, templates);

export {
	TodoList
};
export default TodoList;
