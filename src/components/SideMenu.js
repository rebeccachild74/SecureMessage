import React from 'react';
import AppMode from './../AppMode.js'

class SideMenu extends React.Component {

//renderModeItems -- Renders correct subset of mode menu items based on
//current mode, which is stored in this.prop.mode. Uses switch statement to
//determine mode.
renderRecipients = () => {
  let recips = [];
  console.log(this.props.recipients);
  for (const r in this.props.recipients) {
    recips.push(
      <div key={r} clssName="recipient-btn">
        <a className="sidemenu-item recipient-button">
          &nbsp;{this.props.recipients[r]}
          </a>
      </div>
    );
  }
  console.log(recips);
  return recips;
}

    render() {
       return (
        <div className={"sidemenu " + (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")}>
          {/* SIDE MENU TITLE */}
          <div className="sidemenu-title">
              <span id="userID" className="sidemenu-userID">&nbsp;Inbox</span>
          </div>
          {/* MENU CONTENT */}
          <div className="sidemenu-items">
            {this.renderRecipients()}
          </div>
          <a className="new-msg-btn">
          &nbsp;New Message
          </a>
        </div>
       );
    }
}

export default SideMenu;
