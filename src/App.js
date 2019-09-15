import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots'; // destructuring 'cause robots is not default export

class App extends Component {
    constructor() {
        super(); // call the Component's constructor
        this.state = { // app state
            robots: robots,
            searchfield: ''
        }
    }

    onSearchChange = (event) => { // use arrow function to prevent make sure 'this' refer to app state 
        this.setState({ searchfield: event.target.value });  //update state of the app
    }

    render() {
        const filterrobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });
        
        return (
            <div className="tc" >
                <h1>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <CardList robots={filterrobots} />
            </div>
        );
    }
}

export default App;