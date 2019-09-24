import React, { Component } from 'react'; // destructuring 'cause Component is not default export
import './App.css';
import CardList from '../components/CardList';
import {connect} from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import {setSearchField} from './actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super(); // call the Component's constructor
        this.state = { // app state
            robots: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props; // redux store
        const filterrobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ? //ternary expression
            <h1>Loading...</h1> :
            <div className="tc" >
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterrobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);