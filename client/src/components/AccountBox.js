import React from 'react';
import DeleteConfirmModal from './DeleteConfirmModal.js';
import AppMode from './../AppMode.js'

class AccountBox extends React.Component {

    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.state = {
                      isDeleteOpen: false,
                      accountName: "",
                      displayName: "",
                      profilePicDataURL: "",
                      profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                      accountPassword: "",
                      accountPasswordRepeat: "",
                      originalPassword: "",
                      accountSecurityQuestion: "",
                      accountSecurityAnswer: "",
                      rounds: {},
                      roundCount: 0
                      };

    }

    // used to get user information to edit
    componentWillReceiveProps(nextProps) {
        this.getUserInfo();
    }

    getUserInfo = () => {
        let thisUser = this.props.userId;
        let data = JSON.parse(localStorage.getItem(thisUser));

        // update the fields if its not null
        if (data !== null) {
            this.setState({
                accountName: this.props.userId,
                displayName: data.displayName,
                accountPassword: data.password,
                originalPassword: data.password,
                profilePicDataURL: data.profilePicDataURL,
                accountSecurityQuestion: data.securityQuestion,
                accountSecurityAnswer: data.securityAnswer,
                rounds: data.rounds,
                roundCount: data.roundCount
            });
        }
    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {
        if (this.state.accountPassword != this.state.accountPasswordRepeat && this.state.accountPasswordRepeat != "") {
            //Passwords don't match
            this.repeatPassRef.current.setCustomValidity(
                "Passwords don't match.");
        } else {
            this.repeatPassRef.current.setCustomValidity("");
        }
        let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        if (data != null) {
            // Update existing user
            console.log("update existing user");
            /* this.newUserRef.current.setCustomValidity("An account already exists under this email address. " +
              "Use 'Reset password' to recover the password."); */
        } else {
            this.newUserRef.current.setCustomValidity("");
        }
    }

    //handleEditAccountChange--Called when a field in a dialog box form changes.
    handleEditAccountChange = (event) => {
        if (event.target.name === "profilePic") {
            if (event.target.value.length == 0) { //The user canceled the file selection -- set back to default
                this.setState({profilePicDataURL: "",
                profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg"});
            } else { //The user selected a file
                const self = this;
                const val = event.target.value;
                const reader = new FileReader();
                reader.readAsDataURL(this.profilePicRef.current.files[0]);
                reader.addEventListener("load",function() {
                    self.setState({profilePicURL: "",
                                   profilePicDataURL: this.result});
                });
            }
        } else {
            this.setState({[event.target.name]: event.target.value},this.checkAccountValidity);
        }
    } 

    //setDefaultDisplayName -- Triggered by onBlur() event of Email field.
    //Sets default value of display name to value entered into Email field 
    //as a courtesy.
    setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && this.state.displayName === "") {
        this.setState({displayName: event.target.value});
      }
    }

    handleDeleteAccount = (event) => {
        event.preventDefault();

        // delete account after logging out
        this.props.changeMode(AppMode.LOGIN);

        //this.props.toggleAccountBox();
        localStorage.removeItem(this.props.userId);
    }

    //handleEditAccount -- Triggered when user clicks on "Create Account" button.
    //Custom data checking ensures user account under this email does not 
    //already exist and that the rest of the info is valid. We create a new  
    // object for user, save it to localStorage and take user to app's 
    //landing page. 
    handleEditAccount = (event) => {
        event.preventDefault();
        // assume user does not want to update password
        if(this.state.accountPasswordRepeat === "" && this.state.accountPassword === this.state.originalPassword){
            let userData = {
                displayName: this.state.displayName,
                password: this.state.originalPassword,
                profilePicFile: this.state.profilePicFile,
                profilePicDataURL: this.state.profilePicDataURL,
                securityQuestion: this.state.accountSecurityQuestion,
                securityAnswer: this.state.accountSecurityAnswer,
                rounds: this.state.rounds,
                roundCount: this.state.roundCount
            };
            //Commit to local storage
            localStorage.setItem(this.state.accountName,JSON.stringify(userData));
            //Invite user to log in using new account
            //this.props.newAccountCreated();
        } else if(this.state.accountPassword === this.state.accountPasswordRepeat){
            let userData = {
                displayName: this.state.displayName,
                password: this.state.accountPassword,
                profilePicFile: this.state.profilePicFile, //if empty, use default
                profilePicDataURL: this.state.profilePicDataURL,
                securityQuestion: this.state.accountSecurityQuestion,
                securityAnswer: this.state.accountSecurityAnswer,
                rounds: this.state.rounds,
                roundCount: this.state.roundCount
            };
            //Commit to local storage
            localStorage.setItem(this.state.accountName,JSON.stringify(userData));
            //Invite user to log in using new account
            //this.props.newAccountCreated();
        } else if (this.state.accountPassword !== this.state.originalPassword && this.state.accountPassword !== this.state.accountPasswordRepeat){ // The password field has changed, verify that the password and repeat match.
            this.repeatPassRef.current.setCustomValidity(
                "Passwords don't match.");
                return;
        }
        this.props.toggleAccountBox();
    }

    toggleDeleteModal = () => {
        this.setState(prevState => ({isDeleteOpen: !prevState.isDeleteOpen}));
    }

    render() {
        return (
        <div>
            <DeleteConfirmModal
            isDeleteOpen={this.state.isDeleteOpen}
            toggleDelete={this.toggleDeleteModal}
            handleDeleteAccount={this.handleDeleteAccount}
            userPassword={this.state.accountPassword}/>
        <div className="modal" role="dialog" className={"account modal " + (this.props.accountOpen ? "visible" : "invisible")}>
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                <center>
                <h3 className="modal-title"><b>Edit Account</b></h3>
                </center>
                <button className="close" 
                    onClick={this.props.toggleAccountBox}>
                    &times;</button>
                </div>
                <div className="modal-body">
                <form onSubmit={this.handleEditAccount}>
                <label>
                    Email: 
                    <input
                    className="form-control form-text form-center"
                    name="accountName"
                    type="email"
                    size="35"
                    placeholder="Enter Email Address"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                    required={true}
                    ref={this.newUserRef}
                    onChange={this.handleEditAccountChange}
                    value={this.state.accountName}
                    onBlur={this.setDefaultDisplayName}
                    />
                </label>
                <label>
                    Password:
                    <input
                    className="form-control form-text form-center"
                    name="accountPassword"
                    type="password"
                    size="35"
                    placeholder="Enter Password"
                    pattern=
                    "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required={true}
                    onChange={this.handleEditAccountChange}
                    value={this.state.accountPassword}
                    />
                </label>
                <label>
                    Repeat Password:
                    <input
                    className="form-control form-text form-center"
                    name="accountPasswordRepeat"
                    type="password"
                    size="35"
                    placeholder="Repeat Password"
                    ref={this.repeatPassRef}
                    onChange={this.handleEditAccountChange}
                    value={this.state.accountPasswordRepeat}
                    />
                </label>
                <label>
                    Display Name:
                    <input
                    className="form-control form-text form-center"
                    name="displayName"
                    type="text"
                    size="30"
                    placeholder="Display Name"
                    required={true}
                    onChange={this.handleEditAccountChange}
                    value={this.state.displayName}
                    />
                </label>
                <label>
                    Profile Picture:<br/>
                    <input
                    className="form-control form-text form-center"
                    name="profilePic"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg" 
                    ref={this.profilePicRef}
                    onChange={this.handleEditAccountChange}
                    value={this.state.profilePic}
                    />
                    <img src={this.state.profilePicURL != "" ? 
                                this.state.profilePicURL :
                                this.state.profilePicDataURL} 
                            height="60" width="60" />
                </label> 
                <label>
                    Security Question:
                    <textarea
                    className="form-control form-text form-center"
                    name="accountSecurityQuestion"
                    size="35"
                    placeholder="Security Question"
                    rows="2"
                    cols="35"
                    maxLength="100"
                    required={true}
                    onChange={this.handleEditAccountChange}
                    value={this.state.accountSecurityQuestion}
                    />
                </label>
                <label>
                    Answer to Security Question:
                    <textarea
                    className="form-control form-text form-center"
                    name="accountSecurityAnswer"
                    type="text"
                    placeholder="Answer"
                    rows="2"
                    cols="35"
                    maxLength="100"
                    required={true}
                    onChange={this.handleEditAccountChange}
                    value={this.state.accountSecurityAnswer}
                    />
                </label>
                <br/>
                <button
                    className="btn btn-secondary btn-color-theme modal-submit-btn"
                    onClick={this.toggleDeleteModal}>
                    &nbsp;Delete Account
                </button>
                <br />
                <button role="submit" 
                    className="btn btn-primary btn-color-theme modal-submit-btn">
                    <span className="fa fa-user-plus"></span>&nbsp;Update Account
                </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
    }

export default AccountBox;