import axios from 'axios';
import Datetime from 'react-datetime'
import React, { Component } from 'react';
import add from '../../assets/add.svg';
import remove from '../../assets/remove.svg';

import "react-datetime/css/react-datetime.css";
import moment from 'moment';


const API_ROUTE = process.env.REACT_APP_API_ROUTE;


class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            firstname: null,
            lastname: null,
            relative: null,
            permanent_a: null,
            present_a: null,
            units: [],
            email: null,
            mobile: null,
            pan: null,
            aadhar: null,
            expiry: null,
            purchase_price: null,
            claim_admitted: null,
            claim_submitted: null,
            others_admitted: null
        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {username} = this.state;
        axios.post(`${API_ROUTE}/user/detail`, {username})
        .then(res => {
            console.log(res)
            if(res.data.success) {
                this.setState(res.data.detail)
            }
        })
    }

    submit() {
        if(window.confirm("Do you want to change the data")) {
            axios.post(`${API_ROUTE}/admin/users/edit`, this.state)
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    alert("Save successfull");
                    this.props.closePopup();
                } else {
                    alert("please try again later");
                }
            }).catch(err => alert("something went wrong"))
        }
    }

    render() {
        const {username, password, expiry} = this.state;
        const {firstname, lastname, relative, permanent_a, present_a, units, email, mobile, pan, aadhar} = this.state;
        const {purchase_price, claim_submitted, claim_admitted, others_admitted} = this.state;

        return (
            <div className="popup-box">
                <div className="box">
                {/* <lable>{this.props.file.name}</lable> */}
                    <span className="close-icon" onClick={this.props.closePopup}>x</span>
                    <h3>Edit</h3>
                    <h5 className='mt-3 p-1'>Credentials</h5>
                    <div className='row'>
                        <div className="col mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e)=>this.setState({username: e.target.value.trimStart()})}
                            />
                            </div>

                        <div className="col mb-3">
                            <label>Password</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>this.setState({password: e.target.value.trim()})}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-6">
                            <label>Expiry</label>
                            
                            <Datetime 
                                dateFormat="YYYY-MM-DD"
                                timeFormat={false}
                                value={moment(expiry)}
                                onChange={(e) => this.setState({expiry: moment(e).format("YYYY-MM-DD")})} />
                        </div>
                    </div>

                    <h5 className='mt-3 p-1'>Details</h5>

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

                    <h5 className='mt-3 p-1'>Purchase</h5>

                    <div className='row'>
                        <div className="col mb-3">
                            <label>Purchase Price</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Purchase price"
                                value={purchase_price}
                                onChange={(e)=>this.setState({purchase_price: e.target.value.trimStart()})}
                            />
                        </div>

                        <div className="col mb-3">
                            <label>Claim Submitted</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Claim submitted"
                                value={claim_submitted}
                                onChange={(e)=>this.setState({claim_submitted: e.target.value.trimStart()})}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col mb-3">
                            <label>Claim Admitted</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Claim admitted"
                                value={claim_admitted}
                                onChange={(e)=>this.setState({claim_admitted: e.target.value.trimStart()})}
                            />
                        </div>

                        <div className="col mb-3">
                            <label>Others Admitted</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Others admitted"
                                value={others_admitted}
                                onChange={(e)=>this.setState({others_admitted: e.target.value.trimStart()})}
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
        );
    }
}

export default EditUser;