'use strict';

import TodoList from '../src/TodoList';

let todoList;

describe('TodoList', function() {
	it('should be pass correctly formatted configuration options to TodoList.js', () => {
		todoList  = new TodoList({
			db: {
				url: 'https://db-todolist.wedeploy.io',
				path: 'tasks'
			}
		});
	});
});
