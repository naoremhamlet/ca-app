import React, { Component } from 'react';
import "./PopUp.css"

// const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
class PopUp extends Component {
    render() {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.closePopup}>x</span>
                    <embed src={this.props.file.link} type='application/pdf' width='500' height='700px' />
                </div>
          </div>
        );
    }
}

export default PopUp;