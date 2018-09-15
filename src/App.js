import React, { Component } from 'react';
import TaxonomyLookup from './components/taxonomy-lookup'
import lru from './helpers/lru'
class App extends Component {
  lru = new lru(50);
  render() {

    return (
      <div className="App">
      <div id='ocxlogo' style={{width: '12%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', marginBottom: '3%'}}><img src='https://www.onecodex.com/static/images/uploader_logo.png' style={{width: '100%'}} alt='One Codex Logo'></img></div>
      <div style={{width: '50%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%'}}><h1 style={{textAlign: 'center'}}>Taxonomy Lookup</h1></div>
      <br />
      <TaxonomyLookup local_cache = {this.lru}/>
       
      </div>
    );
  }
}

export default App;
