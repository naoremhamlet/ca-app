import axios from 'axios';
import React, { Component } from 'react'
import add from '../../assets/add.svg';
import remove from '../../assets/remove.svg';

const API_ROUTE = process.env.REACT_APP_API_ROUTE;


export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      firstname: null,
      lastname: null,
      relative: null,
      permanent_a: null,
      present_a: null,
      units: [""],
      email: null,
      mobile: null,
      pan: null,
      aadhar: null,
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const loginstatus = JSON.parse(localStorage.getItem('login-status'));
    if(loginstatus && loginstatus.success) {
        if(loginstatus.username==="admin")
            window.location = "/admin";
        else {
            if(loginstatus.filled) {
                this.setState({ username: loginstatus.username})
            } else {
                this.setState({ username: loginstatus.username})
            }
        }
    } else {
        window.location = "/login"
    }
  }

  submit() {
    console.log(this.state);
    for(const f in this.state) {
      if(f==="units") {
        for(const sf of this.state[`${f}`]) {
          if(sf.length===0)  return alert("please fill all the units")
        }
      } else {
        if(this.state[`${f}`].length===0)  return alert("please fill all the fields")
      }
    }

    axios.post(`${API_ROUTE}/user/detail/edit`, this.state)
    .then(res => {
      console.log(res.data);
      if(res.data.success) {
        const loginstatus = JSON.parse(localStorage.getItem('login-status'));
        loginstatus.filled = 'true';
        localStorage.setItem('login-status', JSON.stringify(loginstatus))
        this.props.changeFilled();
      } else {
        alert("please try again later");
      }
    }).catch(err => alert("something went wrong"))
  }
  
  render() {
    const {firstname, lastname, relative, permanent_a, present_a, units, email, mobile, pan, aadhar} = this.state;
    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
            <h3>Details</h3>
              <div className='row'>
                <div className="col mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e)=>this.setState({firstname: e.target.value.trimStart()})}
                  />
                </div>

                <div className="col mb-3">
                  <label>Last name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e)=>this.setState({lastname: e.target.value.trimStart()})}
                  />
                </div>
              </div>


              <div className="mb-3">
                <label>Father/Husband's name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Father/Husband's name"
                  value={relative}
                  onChange={(e) => this.setState({relative: e.target.value.trimStart()})}
                />
              </div>

              <div className="mb-3">
                <label>Present Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Present Address"
                  value={present_a}
                  onChange={(e) => this.setState({present_a: e.target.value.trimStart()})}
                />
              </div>

              <div className="m-0">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    onChange={(e) => this.setState({ permanent_a: e.target.checked? present_a : permanent_a})}
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    same as present address
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label>Permanent Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Permanent Address"
                  value={permanent_a}
                  onChange={(e) => this.setState({permanent_a: e.target.value.trimStart()})}
                />
              </div>

              <div className="mb-3">

                <label>
                  Unit No. 

                  <img src={add} width={15}
                    alt='+'
                    className='m-1'
                    onClick={() => {
                      units.push("");
                      this.setState({units: units})
                    }} />
                  {units.length > 1 &&
                    <img src={remove} width={15} 
                      alt='-'
                      className='m-1'
                      onClick={() => {
                          units.pop()
                          this.setState({units: units})
                      }} />
                  }
                </label>

                <div className='form-row d-flex flex-wrap'>
                  {units.map((el, i) => (
                    <div className='form-group col-md-3'>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='unit no.'
                        value={el}
                        onChange={(e) => {
                          units[i] = e.target.value.trim();
                          this.setState({units: units})
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className='row'>
                <div className="col mb-3">
                  <label>Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e)=>this.setState({email: e.target.value.trim()})}
                  />
                </div>

                <div className="col mb-3">
                  <label>Mobile number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter Mobile number"
                    value={mobile}
                    onChange={(e)=>this.setState({mobile: e.target.value.trim()})}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="col mb-3">
                  <label>PAN number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter PAN number"
                    value={pan}
                    onChange={(e)=>this.setState({pan: e.target.value.trim()})}
                  />
                </div>

                <div className="col mb-3">
                  <label>Aadhar number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Aadhar number"
                    value={aadhar}
                    onChange={(e)=>this.setState({aadhar: e.target.value.trim()})}
                  />
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
