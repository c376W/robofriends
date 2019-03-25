import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import {robots} from './robots';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
//Testing if this is the robo app
//Would like to change the color.
class App extends Component{
	constructor(){
		super()
		this.state = {
			// robots: robots,
			robots:[],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
		.then(users=>this.setState({robots:users}))
		//// this.setState({robots:robots});
		//// console.log('check');
	}


	onSearchChange=(event)=>{
		this.setState({searchfield:event.target.value})
	}

	render(){
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		  return !robots.length ?
			<h1>Loading</h1> :

			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);
	}	
	
}

export default App;