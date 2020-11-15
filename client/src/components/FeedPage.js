import React from 'react';

class FeedPage extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        let recipText = "To: " + this.props.recipient;
        return (
        <div className="padded-page">
            <div className="message-thread">
                <div className="recipient-info">
                    <span className="user-info">
                        {this.props.recipient === "" ? "Select a user to view messages" :  recipText}
                    </span>
                </div>
            </div>
        </div>
        );
    }     
}

export default FeedPage;