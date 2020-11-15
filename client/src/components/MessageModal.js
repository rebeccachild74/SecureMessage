import React from 'react';

class MessageModal extends React.Component {

    constructor(props) {
        super(props);

        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            recipient: "",
            messageText: "",
        };
    }

    //handleNewMsgChange--Called when a field in a dialog box form changes.
    handleNewMsgChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //handleNewMsgChange--Called when a field in a dialog box form changes.
    handleSendMsg = async (event) => {
        event.preventDefault();

        this.props.
    }


    render() {
        return (
            <div className={"m-modal "  + (this.props.modalOpen === false ? "invisible" : "visible")}>
                <div className="background-blur">
                </div>
                <div className="padded-page">
                    <div className={"message-modal " + (this.props.modalOpen === false ? "invisible" : "visible")}>
                        <span className="new-modal-header">
                            <h2 className="new-modal-heading">New Message &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
                            <a className="close-modal" onClick={this.props.toggleModal}><h2>&times;</h2></a>
                        </span>
                        <div className="new-message-content">
                            <center>
                                <form onSubmit={this.handleSendMsg} className="new-message">
                                    <label>
                                        Recipient:
                                        <textarea
                                        className="form-control form-text form-center"
                                        name="recipient"
                                        type="text"
                                        rows={1}
                                        cols={30}
                                        placeholder="Enter a recipient"
                                        required={true}
                                        value={this.state.recipient}
                                        onChange={this.handleNewMsgChange}
                                        />
                                    </label>
                                    <br/>
                                    <br/>
                                    <label>
                                        Message text:
                                    </label>
                                        <textarea
                                        className="form-control form-text form-center"
                                        name="messageText"
                                        type="text"
                                        rows={4}
                                        cols={50}
                                        placeholder="Enter a message to send"
                                        required={true}
                                        value={this.state.messageText}
                                        onChange={this.handleNewMsgChange}
                                        />
                                    <br/>
                                    <br/>
                                    <button role="submit"
                                        className="btn btn-secondary btn-color-theme modal-submit-btn">
                                        <span className="fa fa-paper-plane"></span>&nbsp;Send
                                    </button>
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }   
}

export default MessageModal;