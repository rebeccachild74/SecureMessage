import React from 'react';
import AppMode from './../AppMode.js'

class AboutBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div id="aboutModal" className={"modal " + (this.props.modalOpen ? "visible" : "invisible")}
            role="dialog"
            // ref callback for storing node reference
            ref={node => { this.node = node; }}>
                <div className="modal-content" style={{background: "#fff"}}>
                    <div className="modal-header">
                        <center>
                        <h3 className="modal-title"><b>About SwimStats</b></h3>
                        </center>
                        <button id="modalClose" className="close"
                        style={{border: "2px solid black", backgroundColor: "black", color: "white"}}
                        onClick={this.props.toggleAboutModal}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                        <center>
                        <h3>The World's Best App for
                        Keeping Track of your Swim Times</h3>
                        </center>
                        <p>SwimStats apps support</p>
                        <ul>
                        <li>live meet scoring</li>
                        <li>tracking personal times and sharing results</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                            <button className="close"
                            style={{border: "2px solid black", backgroundColor: "black", color: "white"}}
                            onClick={this.props.toggleAboutModal}>
                            OK</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutBox;