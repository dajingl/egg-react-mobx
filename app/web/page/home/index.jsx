import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Button, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './style.scss'

@inject('homeStore')
@observer
class Home extends Component {
	static propTypes = {
		homeStore: PropTypes.shape({}).isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		const { homeStore } = this.props
		const {
			Person, number, increase, decrease, setPerson, unfinishedTodos, changeTodoTitle,
		} = homeStore
		setPerson({ name: "wanggang", age: 50 });
		console.log(Person);
		return (
			<div>
				<p>
					{
						unfinishedTodos.map((todo, index) => <li key={index}>{todo.title}</li>)
					}
				</p>
				<Button onClick={()=>{
					changeTodoTitle({ index: 1, title: "修改后的todo标题" });
				}} type="primary"
				>修改标题</Button>
				<p><Link to="/test">goto Test</Link></p>
				<div>当前数：{number}</div>
				<div>
					<Button className="btn" onClick={increase} type="primary">增加</Button>
					<Button onClick={decrease} type="primary">减少</Button>
				</div>
				<CopyToClipboard onCopy={() => { message.success('已经复制至剪贴板！') }}
					text="我是react-copy-to-clipboard插件复制的内容！"
				>
					<button>点击复制文本</button>
				</CopyToClipboard>
			</div>
		)
	}
}

export default Home
