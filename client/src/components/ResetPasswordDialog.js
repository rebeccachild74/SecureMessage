import React from 'react'

class ResetPasswordDialog extends React.Component {

    constructor(props) {
        super(props);

        this.emailRef = React.createRef();
        this.securityRef = React.createRef();
        this.passwordRef = React.createRef();
        this.repeatPasswordRef = React.createRef();

        this.state = {
                      mode: "email",
                      accountName: "",
                      displayName: "",
                      profilePicDataURL: "",
                      profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                      accountPassword: "",
                      accountPasswordRepeat: "",
                      originalPassword: "",
                      accountSecurityQuestion: "",
                      accountSecurityAnswer: "",
                      answerEntry: "",
                      rounds: {},
                      roundCount: 0
                      };
    }

    //handleEditAccountChange--Called when a field in a dialog box form changes.
    handleResetPwdChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

        if(this.state.mode === "email"){
            // check for account - need to use database here
            let thisUser = this.emailRef.current.value;
            let data = JSON.parse(localStorage.getItem(thisUser));
            //Check username and password:
            if (data == null) { 
                this.emailRef.current.setCustomValidity("No account with this email address exists.");
                return; //Exit the function; no need to check pw validity
            } else {
                this.emailRef.current.setCustomValidity("");
            }
        } else if(this.state.mode === "question"){
            if(this.state.accountSecurityAnswer !== event.target.value){
                this.securityRef.current.setCustomValidity("Incorrect answer");
                return; //Exit the function; no need to check pw validity
            } else {
                this.securityRef.current.setCustomValidity("");
            }
        } else if(this.state.mode === "password"){
            if(this.state.accountPassword !== event.target.value){
                this.passwordRef.current.setCustomValidity("Invalid Password");
                return; //Exit the function; no need to check pw validity
            } else {
                this.passwordRef.current.setCustomValidity("");
            }
        }
        
    } 


    handleResetPassword = (event) => {
        event.preventDefault();

        if(this.state.mode === "email"){
            // use database! 
            let thisUser = this.emailRef.current.value;
            let data = JSON.parse(localStorage.getItem(thisUser));

            //Check username and password:
            if (data !== null) {
                this.setState({
                    accountName: thisUser,
                    accountSecurityQuestion: data.securityQuestion,
                    accountSecurityAnswer: data.securityAnswer,
                    originalPassword: data.password,
                    mode: "question",
                    displayName: data.displayName,
                    profilePicDataURL: data.profilePicDataURL,
                    profilePicURL: data.profilePicURL,
                    rounds: data.rounds,
                    roundCount: data.roundCount
                    });
            }
        } else if(this.state.mode === "question"){
            this.setState({mode: "password"});
        } else if(this.state.mode === "password"){
            // change the password
            let userData = {
                displayName: this.state.displayName,
                password: this.state.accountPasswordRepeat,
                profilePicFile: this.state.profilePicFile,
                profilePicDataURL: this.state.profilePicDataURL,
                securityQuestion: this.state.accountSecurityQuestion,
                securityAnswer: this.state.accountSecurityAnswer,
                rounds: this.state.rounds,
                roundCount: this.state.roundCount
            };
            //Commit to local storage
            localStorage.setItem(this.state.accountName,JSON.stringify(userData));

            // toggle modal visibility
            this.props.togglePasswordModal();

            this.setState({mode: "email"});
        }
    }

    getSecurityQuestion() {
        return "Question?";
    }

    render() {

        return(
            <div id="confirmDeleteModal" className={"modal"}
            role="dialog"
            ref={node => { this.node = node; }}>
                <div className="modal-content" style={{background: "#fff"}}>
                    <div className="modal-header">
                        <center>
                        <h3 className="modal-title"><b>Reset Password</b></h3>
                        </center>
                        <button id="modalClose" className="close"
                        style={{border: "2px solid black", backgroundColor: "black", color: "white"}}
                        onClick={this.props.close}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                        <center>
                        <form onSubmit={this.handleResetPassword}>
                            <label className={(this.state.mode === "email") ? "visible" : "invisible"}>
                                Email: 
                                <input
                                className="form-control form-text form-center"
                                name="accountName"
                                type="email"
                                size="35"
                                placeholder="Enter Email Address"
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                required={(this.state.mode === "email")}
                                ref={this.emailRef}
                                value={this.state.accountName}
                                onChange={this.handleResetPwdChange}
                                onBlur={this.setDefaultDisplayName}
                                />
                            </label>
                            <h3 className={(this.state.mode === "question") ? "visible" : "invisible"}>
                                {this.state.accountSecurityQuestion}
                            </h3>
                            <label className={(this.state.mode === "question") ? "visible" : "invisible"}>
                                Answer: 
                                <input
                                className="form-control form-text form-center"
                                name="answerEntry"
                                type="text"
                                size="35"
                                placeholder="Answer"
                                required={(this.state.mode === "question")}
                                ref={this.securityRef}
                                value={this.state.answerEntry}
                                onChange={this.handleResetPwdChange}
                                onBlur={this.setDefaultDisplayName}
                                />
                            </label>
                            <label className={(this.state.mode === "password") ? "visible" : "invisible"}>
                                Password:
                                <input
                                className="form-control form-text form-center"
                                name="accountPassword"
                                type="password"
                                size="35"
                                placeholder="Enter Password"
                                pattern=
                                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                required={(this.state.mode === "password")}
                                value={this.state.accountPassword}
                                ref={this.passwordRef}
                                onChange={this.handleResetPwdChange}
                                />
                            </label>
                            <label className={(this.state.mode === "password") ? "visible" : "invisible"}>
                                Repeat Password:
                                <input
                                className="form-control form-text form-center"
                                name="accountPasswordRepeat"
                                type="password"
                                size="35"
                                placeholder="Repeat Password"
                                required={(this.state.mode === "password")}
                                ref={this.repeatPassRef}
                                value={this.state.accountPasswordRepeat}
                                onChange={this.handleResetPwdChange}
                                />
                            </label>
                            <button role="submit" 
                                className="btn btn-primary btn-color-theme modal-submit-btn">&nbsp;Ok
                            </button>
                            </form>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPasswordDialog;