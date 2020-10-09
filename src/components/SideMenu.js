import React from 'react';
import AppMode from './../AppMode.js'

class SideMenu extends React.Component {

//renderModeItems -- Renders correct subset of mode menu items based on
//current mode, which is stored in this.prop.mode. Uses switch statement to
//determine mode.
renderRecipients = () => {
  let recips = [];
  for (const r in this.props.recipients) {
    recips.push(
      <div key={r} className="recipient-btn">
        <a className="sidemenu-item recipient-button">
          &nbsp;{this.props.recipients[r]}
          </a>
      </div>
    );
  }
  return recips;
}

    render() {
       return (
        <div className={"sidemenu " + (this.props.mode !== AppMode.LOGIN ? "sidemenu-open" : "sidemenu-closed")}>
          {/* SIDE MENU TITLE */}
          <div className="sidemenu-title">
              <span id="userID" className="sidemenu-userID">&nbsp;Inbox</span>
          </div>
          {/* MENU CONTENT */}
          <div className="sidemenu-items">
            {this.renderRecipients()}
          </div>
          <a className="new-msg-btn" onClick={this.props.toggleModal}>
          &nbsp;New Message
          </a>
        </div>
       );
    }
}

export default SideMenu;
