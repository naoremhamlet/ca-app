import axios from 'axios';
import React, { Component } from 'react';
// import MDBFileupload from 'mdb-react-fileupload';
// import generatePdfThumbnails from 'pdf-thumbnails-generator';

const API_ROUTE = process.env.REACT_APP_API_ROUTE;


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pdfs: [],
            errfiles: [],
            uploadedfiles: [],
        }
        
        // this.handleChange = this.handleChange.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }
    

    async uploadFiles() {
        const {pdfs} = this.state;

        if(pdfs.length===0) return;

        const dataForm = new FormData();
        // const files = document.getElementById('upload').files;
        for(const d of pdfs) {
            dataForm.append('file', d)
        }

        axios.post(`${API_ROUTE}/admin/doc/upload`, dataForm)
        .then(res => {
            if(res.data.success) {
                this.setState({pdfs: [], errfiles: res.data.errfiles, uploadedfiles: res.data.uploadedfiles})
            }
        })
        .catch(err => console.log(err));   
    }

    render() {
        const {pdfs, uploadedfiles, errfiles} = this.state;
        return (
            <div className="row justify-content-center w-100 pt-5">
                <div className="col-md-6 ">
                    <form method="post" action="#" id="#"> 
                        <div className="form-group files">
                            <label>Upload Your File </label>
                            <input
                                id='upload' 
                                type="file" 
                                className="form-control" 
                                multiple="true"
                                accept='application/pdf'
                                onChange={(e) => this.setState({pdfs: e.target.files, errfiles: [], uploadedfiles: []})} />
                        </div>
                        {pdfs.length>0?
                            <div>
                                <input type="button" onClick={this.uploadFiles} value="Upload" />
                            </div>:null
                        }
                    </form>
                    {(uploadedfiles.length>0 || errfiles.length>0) &&
                        <div className=''>
                            {uploadedfiles.length>0 &&
                                <div>
                                    <p className='fw-bold m-0'>Uploaded Files</p>
                                    <ul className='text-start'>
                                        {uploadedfiles.map(el => <li>{el}</li>)}
                                    </ul>
                                </div>
                            }
                            {errfiles.length>0 &&
                                <div>
                                    <p className='fw-bold m-0'>Error Files</p>
                                    <ul className='text-start'>
                                        {errfiles.map(el=><li>{el}</li>)}
                                    </ul>
                                </div>
                            }
                            <p className='fw-bold m-0'>You can view your uploads in <i>Docs</i> section</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Upload;