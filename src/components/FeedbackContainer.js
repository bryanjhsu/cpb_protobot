
import React from 'react';
import {Button, Tab, Tabs, Checkbox, FormGroup, FormControl} from 'react-bootstrap';

class FeedbackContainer extends React.Component {

  constructor(props) {
    super();
    this.state = {
      activeTab: props.activeTab || 1
    };

    this.renderComment = this.renderComment.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  renderTabs()
  {
    return (
      <div id="tabDiv">
        <Tabs id = "tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect} className='nav-tabs'>
          <Tab id = "activeTab" className = 'navFeedback'  eventKey={1}  title="Active" >
            {this.renderComments()}
          </Tab>
          <Tab id = "generalTab" className = 'navFeedback' eventKey={2} title="General">
            {this.renderGeneral()}
          </Tab>
        </Tabs>
      </div>
    );
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }

  //resolveStatus: 1 = need to resolve, 2 = resolved, else, no button
  renderComment(user, comment, resolveStatus)
  {
    return(
      <div id ='commentContainer'>
        <div id = "commentUser">
          <img className = "userImg" src={user.pic} width="20"/>
          <span className = 'commentName'>
          {user.name}
          </span>
          <CarrotButton/>
        </div>
        <p className = "commentContent">
        {comment}
        </p>
        <div id='commentButtons'>
          <LikeButton/>
          {resolveStatus === 1 &&
            <ResolveButton isResolved = {false}/>
          }

          {resolveStatus === 2 &&
            <ResolveButton isResolved = {true}/>
          }
        </div>
      </div>
      );
  }

  renderComments()
  {
    return (
    <div id='comments'>
      {this.renderComment(bryan,"Do we need the bot to repeat the phone number if it's already typed out on the screen?", 1)}
      {this.renderComment(dana,"I think it will be something reassuring for the customer to see.", 1)}
      {this.renderComment(michelle,"I think people will probably forget to specify what kind of crust they want.", 2)}
      {this.renderComment(emma,"Okay, Great! I just wanted to double check. Sounds good to me.", 1)}
      {this.renderComment(emma,"Thanks for resolving my issue!", 0)}
    </div>
    );
  }

  renderGeneral()
  {
    return (
    <div id='comments'>
      {this.renderComment(bryan,"This conversation could still use some work.", 1)}
      {this.renderComment(emma,"I agree, the bot needs to show more of its personality.", 2)}
    </div>
    );
  }

  render() {   
    return(
      //after turning md into ll, go through ll and turn to messages
      <div className = 'wrapper'>
  	    <div id='rightContainer'>
  	        <div id = "commentsContainer">
  	        	<div id ="commentsTop">
  		        	<h1 className = "title">
  		        	   COMMENTS
  		        	</h1>
                <p id="commentsDescription"> 1 Unresolved Thread</p>
         			</div>
              {this.renderTabs()}
  		    </div>

          <CommentInput/>
  		    
        </div> 
      </div>
    );
  }
}

class CommentInput extends React.Component
{

  render() 
  {
    return(
      <div id = "submitComment">
        <FormGroup controlId="formControlsTextarea">
          <FormControl componentClass="textarea" placeholder="Write comment here..." />
        </FormGroup>
 
        <Checkbox id="cb">
          Require Resolution
        </Checkbox>

        <Button id="submitBtn" className = "button btnHover" type="submit">
        Submit Comment
        </Button>
      </div>
    );
  }
}

class LikeButton extends React.Component
{
  constructor() {
    super();
    this.state = { liked : false};

     this.onClick = this.onClick.bind(this);
  }

  onClick()
  {
    if(this.state.liked)
      this.setState({liked: false});
    else
      this.setState({liked: true});
  }
 
  render() {
    if(this.state.liked) { 
        return ( <img className = "like" src="./assets/icons/thumbs.png" width="14" onClick={this.onClick}/>);
    } else { 
        return ( <img className = "like" src="./assets/icons/thumbs_off.png" width="14" onClick={this.onClick}/>);
    }
  }
}

class CarrotButton extends React.Component
{
  render() {
    return ( <img className = "carrotDown" src="./assets/icons/carrot.png" width="14" />);
  }
}

class ResolveButton extends React.Component
{
  constructor(props) {
    super();
    this.state = { resolved : props.isResolved};

     this.onClick = this.onClick.bind(this);
  }

  onClick()
  {
    if(this.state.resolved)
      this.setState({resolved: false});
    else
      this.setState({resolved: true});
  }
 
  render() {
    if(!this.state.resolved) { 
        return ( 
          <Button id = "resolveBtn" className = "resolveBtn btnHover" bsStyle="primary" bsSize="small" onClick={this.onClick}>
              Resolve
          </Button>
        );
    } else { 
        return (
          <Button id = "resolveBtn" className = "resolvedBtn btnHover" bsStyle="primary" bsSize="small" onClick={this.onClick}>
            Resolved
            <img id = "shareIcon" src="./assets/icons/check.png" width="12" /> 
          </Button>
        );
    }
  }
}

function User(name, pic)
{
  this.name = name;
  this.pic = pic;
}

var bryan = new User("Bryan Hsu", "./assets/misc/user1.png");
var dana = new User("Dana Buckhorn", "./assets/misc/user2.png");
var danny = new User("Danny Hawk", "./assets/misc/user3.png");
var emma = new User("Emma Davis", "./assets/misc/user4.png");
var michelle = new User("Michelle Hessell", "./assets/misc/user5.png");


export default FeedbackContainer;
