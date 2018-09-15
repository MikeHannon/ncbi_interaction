import * as React from 'react';
import axios from 'axios';

export default class TaxonomyLookup extends React.Component {
  state = {taxonomy_results:[], error:true}
  
  onChange = (event)=>{
    // is event.target.value in LRU, then return this, with no API call
    axios.post(`http://takehome.onecodex.com/api/taxonomy_search`, {query:event.target.value}).then((result)=>{
      this.setState((state)=>{error:false, taxonomy_results: result.data.data})
    }).catch(err=>{
      this.setState((state)=>{error:false})
    })
  }
  render(){
    return(
      <div>
       <input type='text' onChange={this.onChange}/>
       {this.state.error && <p>No results match your query</p>}
      </div>
    
    )
  }

}