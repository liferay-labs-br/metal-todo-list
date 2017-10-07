'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import WeDeploy from 'wedeploy';
import './components/ProgressBar';

import './todo-list.scss';

const DB = 'https://db-todolist.wedeploy.io';
const PATH = 'tasks';

class TodoList extends Component {

	created() {
		this.setState({ disable: true });

		WeDeploy.data(DB).get(PATH)
			.then(tasks => {

				this.setState({ disable: false });

				this.setState({
					tasks: tasks
				});

				console.log('list', tasks);
			})
			.catch(error => {
				console.error(error);
			});
	}

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

			eventTarget.value = "";

			setTimeout(() => {
				inputAdd.focus();
			}, 0);

			console.log('save', response);
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

		console.log(task);

		this.setState({
			tasks: this.tasks
		});

		setTimeout(() => {
			inputEdit.focus();
		}, 0);
	}

	handleSaveEditTask_(event) {

		let eventTarget = event.delegateTarget;
		let task = this.getTask(eventTarget);

		task.description = eventTarget.value;
		task.showEdit = false;

		this.setState({
			tasks: this.tasks
		});

		WeDeploy.data(DB).update(`${PATH}/${task.id}`, {
			'description': eventTarget.value,
			'showEdit': false
		}).then(response => {
			console.log('save edit task', response);
		}).catch(error => {
			console.error(error);
		});
	}

	handleDoneTask_(event) {
		let task = this.getTask(event.delegateTarget);
		task.done = !task.done;

		WeDeploy.data(DB).update(`${PATH}/${task.id}`, {
			"done": task.done
		}).then(response => {

			this.setState({
				tasks: this.tasks
			});

			console.log('done', response);
		}).catch(error => {
			console.error(error);
		});
	}

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

				//visual effect - removing task
				parent.classList.add("removing");

				setTimeout(() => {
					this.tasks.splice(index, 1);
					this.setState({
						tasks: this.tasks
					});
				}, 500);

				this.setState({
					disable: false
				});
				console.log('delete', response);
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
		return parseInt(event.getAttribute("data-index"));
	}

}

TodoList.STATE = {
	tasks: {
		value: []
	},
	disable: {
		value: false
	}
}

Soy.register(TodoList, templates);

export {
	TodoList
};
export default TodoList;
