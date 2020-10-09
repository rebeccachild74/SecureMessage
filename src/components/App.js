import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
import FeedPage from './FeedPage.js';
import MessageModal from './MessageModal.js'

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Welcome to SpeedScore";
modeTitle[AppMode.FEED] = "Activity Feed";
modeTitle[AppMode.ROUNDS] = "My Rounds";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Log New Round";
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Round";
modeTitle[AppMode.COURSES] = "Courses";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.FEED] = FeedPage;


class App extends React.Component {

  constructor() {
    super();
    this.state = {mode: AppMode.LOGIN,
                  modalOpen: false,
                  userId: "",
                  recipients: ["Jermey", "Thomas", "Charlene", "Betsy"],
                  selectedRecipient: ""
                 };
  }

  componentDidMount() {
    console.log("Mounted " + this.state.modalOpen);
    this.setState({modalOpen: false});
    console.log(this.state.modalOpen);
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
    console.log(this.state.mode);
    console.log(this.state.modalOpen);
  }

  togglemodalOpen = () => {
    this.setState(prevState => ({modalOpen: !prevState.modalOpen}));
  }

  setUserId = (Id) => {
    this.setState({userId: Id});
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div>
        <NavBar 
          title={modeTitle[this.state.mode]} 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          modalOpen={this.state.modalOpen}/>
          <SideMenu 
            modalOpen = {this.state.modalOpen}
            mode={this.state.mode}
            userId={this.state.userId}
            recipients={this.state.recipients}
            toggleModal={this.togglemodalOpen}/>
          <ModePage 
            modalOpen={this.state.modalOpen}
            mode={this.state.mode}
            changeMode={this.handleChangeMode}
            userId={this.state.userId}
            setUserId={this.setUserId}
            toggleModal={this.togglemodalOpen}/>
          <MessageModal
            modalOpen={this.state.modalOpen}/>
      </div>
    );  
  }
}

export default App;