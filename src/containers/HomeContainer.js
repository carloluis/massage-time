import React from 'react'
import Home from '../components/Home'
import helpers from '../utils/apiHelper'

class HomeContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            users: []
        };
        this.handleUserChange = this.handleUserChange.bind(this);
    }
    componentDidMount() {
        let users = helpers.getUsers();
        this.setState({ users });
    }
    handleUserChange(e){
        this.setState({
            username: e.target.value
        });
    }
    render(){
        return (
            <Home onUserChange={this.handleUserChange} {...this.state} />
        );
    }
}

export default HomeContainer;