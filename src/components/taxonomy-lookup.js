import * as React from 'react';
import axios from 'axios';
import Option from './option'
import TaxonomicTree from './taxonomic-tree'
export default class TaxonomyLookup extends React.Component {
  state = {taxonomyResults:[], error:false, selectedTaxon: {}}
  
  onChange = (event)=>{
   
    const target = this.selectTarget(event.target.value)
    if (target.length !== 0){
      this.setState((state)=>({taxonomyResults: [], selectedTaxon: target[0]}))
    }

    const from_cache = this.props.local_cache.get(event.target.value)
        
    if (from_cache){
      this.setState((state)=>({error:false, taxonomyResults: from_cache}))
      return
    }
    const value = event.target.value;
    axios.post(`http://takehome.onecodex.com/api/taxonomy_search`, {query:value}).then((result)=>{
      const cache = this.props.local_cache;
      this.setState(
        (state)=>({error:false, taxonomyResults: result.data.results}),
        ()=>{
          cache.set(value, result.data.results )
        }
        
        )
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