import * as React from 'react';
import axios from 'axios';
import Option from './option'
import TaxonomicTree from './taxonomic-tree'
export default class TaxonomyLookup extends React.Component {
  state = {taxonomyResults:[], error:false, selectedTaxon: {}}
  
  onChange = (event)=>{
    if (event.keyCode === 13){
      const target = this.selectTarget(event.target.value)
      if (target){
        this.setState((state)=>({taxonomyResults: [], selectedTaxon: target[0]}))
      }
    }
    // check LRU cache here before making this call.
    axios.post(`http://takehome.onecodex.com/api/taxonomy_search`, {query:event.target.value}).then((result)=>{
      this.setState((state)=>({error:false, taxonomyResults: result.data.results}))
    }).catch(err=>{
      this.setState((state)=>{error:true})
    })
  }

  selectTarget = (selection) => {
    return this.state.taxonomyResults.filter(taxa => taxa.name === selection)
  }

  render(){
    return(
      <div>
       <input type='text' onKeyUp={this.onChange} list={'taxa'}/>
       <datalist id='taxa'>
        {this.state.taxonomyResults && this.state.taxonomyResults.map((taxa)=><Option key={taxa.id} taxa={taxa}/>)}
       </datalist>
       {this.state.error && <p>No results match your query</p>}
       {Object.keys(this.state.selectedTaxon).length ? <TaxonomicTree selectedTaxon = {this.state.selectedTaxon} /> : null}
      </div>
    
    )
  }

}