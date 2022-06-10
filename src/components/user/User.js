import React, { Component } from 'react';
import Details from './Details';
import View from './View';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            filled: false,
        }
    }

    componentDidMount() {
        const loginstatus = JSON.parse(localStorage.getItem('login-status'));
        if(loginstatus && loginstatus.success) {
            if(loginstatus.username==="admin")
                window.location = "/admin";
            else {
                if(loginstatus.filled) {
                    this.setState({ filled: true, username: loginstatus.username})
                } else {
                    this.setState({ filled: false, username: loginstatus.username})
                }
            }
        } else {
            window.location = "/login"
        }
    }
    
    render() {
        const {filled,username} = this.state;
        if(filled)
            return <View />
        else
            return <Details 
                    username={username} 
                    changeFilled={()=>this.setState({filled: true})}
                />
    }
}

export default User;