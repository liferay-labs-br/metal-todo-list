'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {

	createNewElement(e) {

		let tempList = {
			name: e.target.value,
			done: false
		}

		this.setState(
			{
				list: this.list.concat(tempList)
			});
		this.refs.myInput.value = "";

	}

	markDone(e) {
		console.log(this.list[e.target.getAttribute("data-index")]);
		let temp = {
			name: this.list[e.target.getAttribute("data-index")].name,
			done: !this.list[e.target.getAttribute("data-index")].done
		}
		this.list.splice(e.target.getAttribute("data-index"), 1, temp);
		this.setState({ list: this.list });


	}

	remove(e) {
		if (e.target.tagName == "SPAN") {
			console.log(e.target.getAttribute("data-index"));
			let removedTask = {
				name: this.list[e.target.getAttribute("data-index")].name,
				done: !this.list[e.target.getAttribute("data-index")].done
			}
			this.list.splice(e.target.getAttribute("data-index"), 1);
			this.setState(
				{
					list: this.list,
					removedTasks: this.removedTasks.concat(removedTask)
				});
		}
	}

}

TodoList.STATE = {
	list: {
		value: []
	},

	removedTasks: {
		value: []
	}



}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
