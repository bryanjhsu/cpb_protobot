import React, { Component } from 'react';

import NarrativeContainer from './components/NarrativeContainer';
import InfoContainer from './components/InfoContainer';
import FeedbackContainer from './components/FeedbackContainer';
import HeaderContainer from './components/HeaderContainer';

class App extends React.Component {
  //onupload -> parse md to dialogue -> populate narrative with dialogue
  //onHighlightChanged-> singleton highlighted msg -> change active thread
  
  constructor(props){
    super(props);
    this.state = {
      dialogue: null,
      currentHighlightedIndex: 0
    };
    this.uploadDialogue = this.uploadDialogue.bind(this);
  }

  uploadDialogue(dialogueFromUpload){
    this.setState({dialogue: dialogueFromUpload});
  }

  render() {
    return (
      <div id = 'content' className='container'>

        <HeaderContainer/>
        
        <section id='left'>
          <InfoContainer uploadCallback={this.uploadDialogue}/>
        </section>
        

        <div id='middle'>
          <NarrativeContainer dialogue={this.state.dialogue}/>
        </div>

        <section id='right'>
          <FeedbackContainer activeTab={2}/>
        </section>

      </div>

    )
  }
}

export default App;