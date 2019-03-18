import { observable, action, computed } from 'mobx'

class HomeStore {
	@observable number = 0
	@action increase = () => {
		this.number += 1
	}
	@action decrease = () => {
		this.number -= 1
	}

	@observable Person = {
		name: "John",
		age: 42,
	}
	@action setPerson = (newObj = {}) => {
		Object.keys(newObj).map((key) => {
			if (!key) {
				return false;
			}
			this.Person[key] = newObj[key];
			return true;
		});
	}

	@observable todos = [{
		title: "todo标题",
		done: false,
	}, {
		title: "已经完成 todo 的标题",
		done: true,
	}];
	@action changeTodoTitle = ({ index, title }) => {
		this.todos[index].title = title
	}
	@computed get unfinishedTodos() {
		return this.todos.filter((todo) => todo.done)
	}
}

export default new HomeStore()
