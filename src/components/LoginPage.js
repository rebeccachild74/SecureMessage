import React from 'react';
import AppMode from "./../AppMode.js";

class LoginPage extends React.Component {

    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
      }
    
    //Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
    }  

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.changeMode(AppMode.FEED);
        this.props.toggleMenuOpen();
        this.props.setUserId(this.emailInputRef.current.value);
    }

    render() {
        return(
        <div id="login-mode-div" className="padded-page login-div">
        <center>
            <h1>SecureMessage Login</h1>
            <p />
            <h1 />
            <form id="loginInterface" onSubmit={this.handleSubmit}>
            <label htmlFor="emailInput" className="field-input">
                Username:
                <input
                ref={this.emailInputRef}
                className="form-control login-text"
                type="text"
                placeholder="Enter Username"
                id="emailInput"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                required={true}
                />
            </label>
            <p />
            <label htmlFor="passwordInput" className="field-input">
                Password:
                <input
                className="form-control login-text"
                type="password"
                placeholder="Enter Password"
                pattern="[A-Za-z0-9!@#$%^&*()_+\-]+"
                required={true}
                />
            </label>
            <p className="bg-danger" id="feedback" style={{ fontSize: 16 }} />
            <br />
            <button
                type="submit"
                className="btn-color-theme btn btn-primary btn-block login-btn">
                <span id="login-btn-icon" className="fa fa-sign-in"/>
                &nbsp;Log In
            </button>
            <p className="login-footer">
                <i>© 2020 SecureMessage. All rights reserved.</i>
            </p>
            </form>
        </center>
        </div>
        )
    }
}

export default LoginPage;
