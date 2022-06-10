import axios from 'axios';
import React, { Component } from 'react';
import edit from '../../assets/edit.svg';
import Delete from '../../assets/delete.svg';
import AddUser from '../popup/AddUser';
import EditUser from '../popup/EditUser';

const API_ROUTE = process.env.REACT_APP_API_ROUTE;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPopup: false,
            editPopup: false,
            users: []
        }
        this.getUsers = this.getUsers.bind(this);
    }


    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get(`${API_ROUTE}/admin/users`)
        .then(res => {
            if(res.data.success)
                this.setState({ users: res.data.users});
            else 
                alert("somthing went wrong");
        }).catch(err => alert("something went wrong"));
    }
    
    render() {
        const {addPopup, users, editPopup, selectedUsername} = this.state;
        return (
            <>
                {addPopup && 
                    <AddUser
                        closePopup={()=> {
                            this.getUsers(); 
                            this.setState({addPopup: false});
                        }}
                    />
                }
                {editPopup &&
                    <EditUser
                        username={selectedUsername}
                        closePopup={()=>this.setState({editPopup: false, selectedUsername: null})}
                    />
                }
                <button className='btn btn-light mt-2' onClick={()=>this.setState({addPopup: true})}>Add User</button>  
                <div className='row justify-content-center w-100 pt-5'>
                    <table className="table w-50 dark">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Password</th>
                                <th scope="col">Edit</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='table-light'>
                            {users.map(el => (
                                <tr>
                                    <th>{el.username}</th>
                                    <td>{el.password}</td>
                                    <td>
                                        <img src={edit} 
                                            width={15} 
                                            alt='edit'
                                            onClick={() => this.setState({selectedUsername: el.username, editPopup: true})} />
                                    </td>
                                    <td>
                                        <img src={Delete} 
                                            width={15} 
                                            alt='edit'
                                            onClick={() => {
                                                axios.post(`${API_ROUTE}/admin/users/remove`, {username: el.username})
                                                .then(res => {
                                                    if(res.data.success)
                                                        this.getUsers();
                                                }).catch(err => alert("somthing went wrong"));
                                            }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Users;