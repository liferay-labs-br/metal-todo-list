'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';
import WeDeploy from 'wedeploy';
import './components/loading-bar/LoadingBar';
import './components/toast/Toast';

import './todo-list.scss';

class TodoList extends Component {

	created() {

		WeDeploy.data(this.db.url).get(this.db.path).then(tasks => {

			this.setState({
				locked: false,
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
		let inputAdd = document.querySelector('#inputAdd');

		this.setState({
			locked: true
		});

		WeDeploy.data(this.db.url).create(this.db.path, {
			description: eventTarget.value,
			done: false,
			showEdit: false
		}).then(task => {

			this.tasks.splice(index, 1, task);

			this.setState({
				locked: false,
				tasks: this.tasks
			});

			//message
			this.toast(this.language.save);

			//clean input
			eventTarget.value = "";

			//set focus on input
			this.setFocus(inputAdd);

		}).catch(error => {
			console.error(error);
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
			locked: true
		});

		WeDeploy.data(this.db.url).update(`${this.db.path}/${task.id}`, {
			description: eventTarget.value,
			showEdit: false
		}).then(response => {

			this.setState({
				tasks: this.tasks,
				locked: false
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
			locked: true
		});

		WeDeploy.data(this.db.url).update(`${this.db.path}/${task.id}`, {
			done: !task.done
		}).then(response => {

			task.done = !task.done;

			this.setState({
				tasks: this.tasks,
				locked: false
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
			locked: true
		});

		WeDeploy.data(this.db.url).delete(`${this.db.path}/${task.id}`)
			.then(response => {

				this.tasks.splice(index, 1);
				this.setState({
					tasks: this.tasks,
					locked: false
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
		let message = { icon, text, hide: false };

		this.messages.push(message);
		this.setState({ messages: this.messages });

		setTimeout(() => {
			message.hide = true;
			this.setState({	messages: this.messages });
		}, 5000);
	}

}

TodoList.STATE = {
	/**
	 * The path of tasks on Database
	 * @instance
	 * @memberof Toast
	 * @type {Object}
	 */
	db: Config.shapeOf({
		path: Config.string().required(),
		url: Config.string().required(),
	}).required(),

	locked: {
		value: true
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
	},
	messages: {
		value: []
	},
	tasks: {
		value: []
	}
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
