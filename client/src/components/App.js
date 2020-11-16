import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import FloatingButton from './FloatingButton.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
import FeedPage from './FeedPage.js';
import Rounds from './Rounds.js';
import CoursesPage from './CoursesPage.js';
import AboutBox from './AboutBox.js';
import AccountBox from './AccountBox.js';
import MessageModal from './MessageModal.js'
import { async } from 'regenerator-runtime';

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
modeToPage[AppMode.ROUNDS] = Rounds;
modeToPage[AppMode.ROUNDS_LOGROUND] = Rounds;
modeToPage[AppMode.ROUNDS_EDITROUND] = Rounds;
modeToPage[AppMode.COURSES] = CoursesPage;


class App extends React.Component {

  constructor() {
    super();
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  authenticated: false,
                  userObj: {displayName: "", profilePicURL: ""},
                  userInbox: "",
                  recipients: ["Jermey", "Thomas", "Charlene", "Betsy"],
                  allMessages: [],
                  currentThread:[],
                 };
  }

  //componentDidMount
  componentDidMount() {
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.setState({
              userObj: obj.user,
              modalOpen: false,
              authenticated: true,
              allMessages: obj.user.messages,
              mode: AppMode.FEED //We're authenticated so can get into the app.
            });
          }
        }
      )
    }
    this.getAllUsers();
  }

  getAllUsers = async() => {
    // fetch all the users in the db
    const res = await fetch("/users", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
      method: 'GET' }); 
    //console.log(res.json());
    let users = await res.json();
    //console.log(users);
    users = JSON.parse(users);
    console.log(users);
    this.setState({recipients: users});
  }

  sendMsg = async(recipient, text) => {
    // Get the recipient public key - coming soon!

    // Add a message to both users messages

    let url = '/messages/sender/' + this.state.userObj.id + '/' + recipient;
        let messageInfo = {
            recipientId: recipient,
            senderId: this.state.userObj.id,
            text: text,
            privateKey: this.state.userObj.privateKey,
        };
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(messageInfo)}); 
        if (res.status == 200) { //successful
            console.log("Message sent!");
        } else { //Unsuccessful
            //Grab textual error message
            const resText = await res.text();
            console.log(resText);
        }

    url = '/messages/recipient/' + this.state.userObj.id + '/' + recipient;
        messageInfo = {
            recipientId: recipient,
            senderId: this.state.userObj.id,
            text: text,
            privateKey: this.state.userObj.privateKey,
        };
        res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(messageInfo)}); 
        if (res.status == 200) { //successful
            console.log("Message sent!");
        } else { //Unsuccessful
            //Grab textual error message
            const resText = await res.text();
            console.log(resText);
        }

    // refetch users messages the message thread
    if (this.state.userInbox !== ""){

      url = "/messages/" + this.state.userObj.id;
      res = await fetch(url, {method: 'GET'});
      if (res.status != 200) {
          let msg = await res.text();
          alert("There was an error obtaining messages data for this user: " + msg);
          return;
      } 
      let body = await res.json();
      body = JSON.parse(body);
      this.setState({allMessages: body});
      console.log(body);
      this.toggleUserInbox(this.state.userInbox);
    }

  }

  //refreshOnUpdate(newMode) -- Called by child components when user data changes in 
  //the database. The function calls the users/:userid (GET) route to update 
  //the userObj state var based on the latest database changes, and sets the 
  //mode state var is set to newMode. After this method is called, the
  //App will re-render itself, forcing the new data to 
  //propagate to the child components when they are re-rendered.
  refreshOnUpdate = async(newMode) => {
    let response = await fetch("/users/" + this.state.userObj.displayName);
    response = await response.json();
    const obj = JSON.parse(response);
    this.setState({
      userObj: obj,
      mode: newMode
    });
  }


  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  setUserId = (Id) => {
    this.setState({userId: Id,
                   authenticated: true});
  }

  toggleAboutModal = () => {
    this.setState(prevState => ({modalOpen: !prevState.modalOpen}));
  }

  togglemodalOpen = () => {
    this.setState(prevState => ({modalOpen: !prevState.modalOpen}));
  }

  toggleAccountBox = () => {
    this.setState(prevState => ({accountOpen: !prevState.accountOpen}));
  }

  toggleUserInbox = async (userId) => {

    // fetch the thread of messages to send as a prop
    //console.log(this.state.userObj.messages);

    // filter for messages between current user and recipient(userInbox)
    let inbox = this.state.allMessages.filter((e) => {
      if (e.senderId === userId || e.recipientId === userId){
        return e;
      }
    })

    this.setState({userInbox: userId, currentThread: inbox});

    //console.log(inbox);
    //console.log("Toggled inbox to user: " + userId);
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div>
        <NavBar 
          title={modeTitle[this.state.mode]} 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          displayName={this.state.userObj.displayName}
          logOut={() => this.handleChangeMode(AppMode.LOGIN)}/>
          <SideMenu 
            menuOpen = {this.state.menuOpen}
            modalOpen = {this.state.modalOpen}
            toggleModal={this.togglemodalOpen}
            toggleUserInbox={this.toggleUserInbox}
            recipients={this.state.recipients}
            mode={this.state.mode}
            toggleMenuOpen={this.toggleMenuOpen}
            toggleAccountBox={this.toggleAccountBox}
            userId={this.state.userObj.id}
            changeMode={this.handleChangeMode}
            displayName={this.state.userObj.displayName}
            profilePicURL={this.state.userObj.profilePicURL}
            logOut={() => this.handleChangeMode(AppMode.LOGIN)}/>
          <ModePage 
            recipient={this.state.userInbox}
            thread={this.state.currentThread}
            menuOpen={this.state.menuOpen}
            mode={this.state.mode}
            changeMode={this.handleChangeMode}
            userObj={this.state.userObj}
            userId={this.state.userObj.id}
            refreshOnUpdate={this.refreshOnUpdate}/>
          <MessageModal
            toggleModal={this.togglemodalOpen}
            modalOpen={this.state.modalOpen}
            sendMessage={this.sendMsg}/>
      </div>
    );  
  }
}

export default App;