import React, { Component } from 'react';
import thumbnail from '../../helper/thumbnail';
import PopUp from '../popup/PopUp';
// import link from './Requirement.pdf';
import Delete from '../../assets/delete.svg';
import View from '../../assets/view.svg';
import axios from 'axios';

const API_ROUTE = process.env.REACT_APP_API_ROUTE;


class Docs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            openPopup: false,
            selectedFile: {}
        }
       
        this.TBody = this.TBody.bind(this);
        this.addThumbnail = this.addThumbnail.bind(this);
        this.getDocs = this.getDocs.bind(this);
        this.deleteDoc = this.deleteDoc.bind(this);
    }

    componentDidMount() {
        this.getDocs();
    }

    getDocs() {
        axios.get(`${API_ROUTE}/admin/doc`)
        .then(res => {
            if(res.data.success) {
                this.setState({
                    docs: res.data.docs
                }, () => {
                    this.addThumbnail() 
                })
            }
        }).catch(err => console.log(err))
    }

    async addThumbnail() {
        const {docs} = this.state;

        for(let d of docs) {
            d['thumbnail'] = await thumbnail(d.link);
        }

        this.setState({docs})
    }

    deleteDoc(filename, link) {
        axios.post(`${API_ROUTE}/admin/doc/delete`, {filename, link})
        .then(res => {
            if(res.data.success)
                this.getDocs();
        }).catch(err => console.log(err))
    }

    TBody() {
        const {docs} = this.state;
        return(
            <>
            {
                docs.map(el => 
                    <tr>
                        <th>{el.filename}</th>
                        <td><img className='thumbnail__img' alt='#' src={el.thumbnail} /></td>
                        <td onClick={()=>this.setState({selectedFile:el, openPopup: true})}>
                            <img src={View} alt="view" width={20} />
                        </td>
                        <td onClick={()=> {this.deleteDoc(el.filename, el.link)}}><img src={Delete} alt="delete" width={20} /></td>
                    </tr>
                )
            }
            </>
        )
    }

    

    render() {
        const {openPopup,selectedFile} = this.state;
        return (
            <div className='row justify-content-center w-100 pt-5'>

                {openPopup && 
                    <PopUp
                        closePopup={()=>this.setState({openPopup: false, selectedFile: {}})}
                        file={selectedFile} 
                    />
                }

                <table className="table w-50 dark">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Doc-Name</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">View</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                        <this.TBody />
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Docs;