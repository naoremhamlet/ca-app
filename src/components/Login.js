import axios from 'axios';
import React, { Component } from 'react'

const API_ROUTE = process.env.REACT_APP_API_ROUTE;

export default class Login extends Component {

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
    axios.post(`${API_ROUTE}/authenticate`, {username, password})
    .then(res => {
      if(res.data.success) {
        localStorage.setItem('login-status', JSON.stringify(res.data));
        if(res.data.username==="admin") 
          window.location = "/admin";
        else 
          window.location = "/user";
      } else {
        alert("Invalid")
      }
    }).catch(err =>  {
      console.log(err);
      alert("something went wrong")
    });
  }
  

  render() {
    const {username, password} = this.state;
    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
              <h3>Sign In</h3>
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

              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={this.submit}>
                  Submit
                </button>
              </div>
        </div>
      </div>
    )
  }
}
