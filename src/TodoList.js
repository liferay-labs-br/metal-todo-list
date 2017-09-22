'use strict';

import templates from './TodoList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import './todo-list.scss';

class TodoList extends Component {
}
Soy.register(TodoList, templates);

export { TodoList };
export default TodoList;
