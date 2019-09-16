import React, { Component } from 'react'; // destructuring 'cause Component is not default export
import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';

class App extends Component {
    constructor() {
        super(); // call the Component's constructor
        this.state = { // app state
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => { // use arrow function to prevent make sure 'this' refer to app state 
        this.setState({ searchfield: event.target.value });  //update state of the app
    }

    render() {
        const filterrobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        if (this.state.robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className="tc" >
                    <h1 className="f1">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filterrobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;