import React from 'react';
import AppMode from './../AppMode.js'

class DeleteConfirmModal extends React.Component {

    constructor(props) {
        super(props);

        this.passRef = React.createRef();

        this.state = {
            enteredPassword: "",
        };

    }

    handlePswdInputChange = (event) => {
        this.setState({enteredPassword: event.target.value});
        if(event.target.value !== this.props.userPassword){
            this.passRef.current.setCustomValidity(
                "Invalid password");
        } else {
            this.passRef.current.setCustomValidity("");
            this.setState({enteredPassword: event.target.value});
        }
    } 

    deleteUser = (event) => {
        // if the password matches, call props delete method.
        event.preventDefault();

        if(this.state.enteredPassword === this.props.userPassword){
            this.props.handleDeleteAccount(event);
            this.props.toggleDelete();
        }
    }

    render () {
        return (
            <div id="aboutModal" className={"delete modal " + (this.props.isDeleteOpen ? "visible" : "invisible")}
            role="dialog"
            // ref callback for storing node reference
            ref={node => { this.node = node; }}>
                <div className="modal-content" style={{background: "#fff"}}>
                    <div className="modal-header">
                        <center>
                        <h3 className="modal-title"><b>Delete Account</b></h3>
                        </center>
                        <button id="modalClose" className="close"
                        style={{border: "2px solid black", backgroundColor: "black", color: "white"}}
                        onClick={this.props.toggleDelete}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                        <center>
                        <h3>Enter your password to delete your account</h3>
                        </center>
                        <form onSubmit={this.deleteUser}>
                        <label>
                            Password:
                            <input
                            className="form-control form-text form-center"
                            name="accountPassword"
                            type="password"
                            size="35"
                            placeholder="Enter Password to Delete Account"
                            required={true}
                            ref={this.passRef}
                            onChange={this.handlePswdInputChange}
                            value={this.state.enteredPassword}
                            />
                        </label>
                        <br />
                        <button role="submit" 
                            className="btn btn-primary btn-color-theme modal-submit-btn">&nbsp;Confirm Delete Account
                        </button>
                        <button 
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            onClick={this.props.toggleDelete}>&nbsp;Cancel
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteConfirmModal;