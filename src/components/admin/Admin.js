import React, { Component } from 'react';
import Docs from './Docs';
import Header from './Header';
import Upload from './Upload';
import Users from './Users';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "upload"
        }
    }

    componentDidMount() {
        const loginstatus = JSON.parse(localStorage.getItem('login-status'));
        if(loginstatus && loginstatus.success) {
            if(loginstatus.username!=="admin")
                window.location = "/user";
        } else {
            window.location = "/login"
        }
    }
    
    render() {
        const {active} = this.state;
        return (
            <div>
                <Header changeActive={(active)=>this.setState({active})} />
                {active==="upload" && <Upload />}
                {active==="docs" && <Docs />}
                {active==="users" && <Users />}
            </div>
        );
    }
}

export default Admin;