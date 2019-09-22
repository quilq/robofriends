import React, { Component } from 'react'; // destructuring 'cause Component is not default export
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

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
        const { robots, searchfield } = this.state;
        const filterrobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        return !robots.length ? //ternary expression
            <h1>Loading...</h1> :
            <div className="tc" >
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterrobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default App;