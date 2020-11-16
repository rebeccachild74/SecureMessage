import React from 'react';

class FeedPage extends React.Component {

    constructor(props) {
        super(props);

    }

    //renderModeItems -- Renders correct subset of mode menu items based on
    //current mode, which is stored in this.prop.mode. Uses switch statement to
    //determine mode.
    renderRecipients = () => {
        let recips = [];
        console.log(this.props.userId);
        for (const r in this.props.recipients) {
        let currId = this.props.recipients[r].id
        if (currId !== this.props.userId){
            recips.push(
            <div key={r} className="recipient-btn">
                <a className="sidemenu-item recipient-button"
                onClick={() => {this.props.toggleUserInbox(currId)}}>
                &nbsp;{this.props.recipients[r].displayName}
                </a>
            </div>
            );
        }
        }
        return recips;
    }

    renderMessageThread = () => {
        console.log(this.props.thread);

        let thread = [];
        for (const r in this.props.thread){
            let isSender = this.props.thread[r].senderId === this.props.userId;
            if (isSender){
                thread.push(
                    <div>
                        <div key={r} className="sent msg">
                            {this.props.thread[r].text}
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    
                );
            } else {
                thread.push(
                    <div>
                        <div key={r} className="recieved msg">
                            {this.props.thread[r].text}
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                    
                );
            }
        }
        return thread;
    }

    render() {
        let recipText = "To: " + this.props.recipient;
        return (
        <div className="padded-page">
            <div className="message-thread">
                <center>
                    <div className="recipient-info">
                        <span className="user-info recipient">
                            {this.props.recipient === "" ? "Select a user to view messages" :  recipText}
                        </span>
                    </div>
                </center>
                <div className="thread-content">
                    {this.renderMessageThread()}
                </div>
            </div>
        </div>
        );
    }     
}

export default FeedPage;