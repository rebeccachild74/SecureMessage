import React from 'react';
import AppMode from '../AppMode';

class NavBar extends React.Component {

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ROUNDS_LOGROUND || 
          this.props.mode === AppMode.ROUNDS_EDITROUND)
          return "fa fa-arrow-left";
      if (this.props.modalOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ROUNDS_LOGROUND ||
        this.props.mode === AppMode.ROUNDS_EDITROUND) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode !== AppMode.LOGIN) {
      alert("open menu");
    }
  }

    
  render() {
    return (
    <div className={"navbar" + (this.props.mode === AppMode.LOGIN ? " invisible" : " visible")}>  
    <span className="navbar-items">
      <span className="navbar-title">
        &nbsp;SecureMessage
      </span>
      <span className="user-info">
        username
      </span>
      <span className="user-info icon"></span>
      </span>
  </div>
); 
}
}

export default NavBar;
