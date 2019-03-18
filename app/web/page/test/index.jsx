import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs } from 'antd'

import { getExampleData, updateExampleData } from '../../service';
import './style.scss'

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: "1",
		}
	}
	render() {
		return (
			<div className="wrap">
				<p>this is test page</p>
				<Button className="btn" onClick={()=>{
					getExampleData({ mixnick: 'test01' }).then(res => {
						console.log("getExampleData.data===", res) // 这里返回的是你根据http.js拦截器中定义的返回数据
					}).catch(err => console.log(err)) // 处理报错信息
				}} type="primary"
				>GET请求接口,console打印</Button>
				<Button className="btn" onClick={()=>{
					updateExampleData({
						mixnick: "test01",
						birthday: "2000-02-02",
						phone: "1830929000",
					}).then(res => {
						console.log("updateExampleData.data===", res) // 这里返回的是你根据http.js拦截器中定义的返回数据
					}).catch(err => console.log(err)) // 处理报错信息
				}} type="primary"
				>POST请求接口,console打印</Button>
				<Link to="/home">goto Home</Link>
				<Tabs ref={(e) => { this._Tabs = e }} activeKey={this.state.index} onChange={(key)=>{
					console.log(key);
					this.setState({ index: key });
				}}
				>
					<Tabs.TabPane key="1" tab="Tab 1">Content of Tab Pane 1</Tabs.TabPane>
					<Tabs.TabPane key="2" tab="Tab 2">Content of Tab Pane 2</Tabs.TabPane>
					<Tabs.TabPane key="3" tab="Tab 3">Content of Tab Pane 3</Tabs.TabPane>
				</Tabs>
				<Button className="btn" onClick={()=>{
					console.log(this._Tabs)
					this.setState({ index: "2" });
				}} type="primary"
				>选中第二个</Button>
			</div>
		)
	}
}
export default Test
