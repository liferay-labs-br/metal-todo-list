'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {
    newElement(event) {
        this.setState({task: this.task.concat(event.target.value)});
    }

}

TodoList.STATE = {
    task: {
        value: []
    }
}

Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
