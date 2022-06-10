import axios from 'axios';
import React, { Component } from 'react';
const API_ROUTE = process.env.REACT_APP_API_ROUTE;


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        const {username, password} = this.state;
        if(username.length>0 && password.length>0) {
            axios.post(`${API_ROUTE}/admin/users/add`, {username, password})
            .then(res => {
                if(res.data.success)
                    this.props.closePopup();
            }).catch(err => alert("something went wrong"))
        }
    }
    
    render() {
        const {username, password} = this.state;
        return (
            <div className="popup-box">
                <div className="box">
                {/* <lable>{this.props.file.name}</lable> */}
                    <span className="close-icon" onClick={this.props.closePopup}>x</span>
                    <h3>Create User</h3>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e)=>this.setState({username: e.target.value.trimStart()})}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>this.setState({password: e.target.value.trimStart()})}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" onClick={this.submit}>
                            Submit
                        </button>
                    </div>
                </div>
          </div>
        );
    }
}

export default AddUser;