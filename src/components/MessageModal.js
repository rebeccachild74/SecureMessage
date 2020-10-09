import React from 'react';

class MessageModal extends React.Component {

    render() {
        return (
            <div className={"m-modal "  + (this.props.modalOpen === false ? "invisible" : "visible")}>
                <div className="background-blur">
                </div>
                <div className="padded-page">
                    <div className={"message-modal " + (this.props.modalOpen === false ? "invisible" : "visible")}>
                        <div className="modal-content">
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }   
}

export default MessageModal;