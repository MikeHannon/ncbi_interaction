import * as React from 'react';
import axios from 'axios';
import LearnMore from './learn-more'

const CLASSIFICATIONS = [
  'root',
  'superkingdom',
  'phylum',
  'class',
  'order',
  'family',
  'genus',
]
const BLOCK_STYLING = {marginTop: '3', marginBottom: '3', marginBlockStart: '4px',  marginBlockEnd: '4px'}
export default class TaxonomicTree extends React.Component {
  state = {lineage:[]}
  get lineageMap(){
    return this.props.selectedTaxon.rank === 'species' && this.state.lineage.length === 8 ? 
    this.state.lineage.slice(0, 8) :  this.state.lineage
  }
  componentDidMount(){
    this.updateTaxonInformation()
   
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      this.updateTaxonInformation()
    }
  }

  updateTaxonInformation = ()=>{
    // axios.get(`http://takehome.onecodex.com/api/taxonomy/${this.props.selectedTaxon.id}`).then(result=>{DATA TO BUILD RELATIONSHIP TREE})
    axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${this.props.selectedTaxon.id}`).then(result=>{
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result.data,"text/xml");
      const lineage = xmlDoc.getElementsByTagName("Lineage")[0].childNodes[0].nodeValue.split(';');
      this.setState((state)=>({...state, lineage }))}).catch((e)=>{console.log(e)})
  }
  render(){
  return <div>

  {this.lineageMap.map((level, idx)=> (
    // @TODO - make this a component
    <div style={{display:'flex', flex: '1', ...BLOCK_STYLING }} key={level+CLASSIFICATIONS[idx]}>
      <p style={{flex: '1', marginTop: '3', ...BLOCK_STYLING}} className={CLASSIFICATIONS[idx]} > 
      {CLASSIFICATIONS[idx]} 
      </p> 
      <p style={{flex: '3', marginTop: '3', ...BLOCK_STYLING}}> 
        {level} 
      </p>
    </div> ))}

  { this.props.selectedTaxon.rank === 'species' ? 
  <p> {this.props.selectedTaxon.rank} - <i> {this.props.selectedTaxon.name} </i></p>  : 
  <p> {this.props.selectedTaxon.rank} - {this.props.selectedTaxon.name} </p> }
  
  <LearnMore name={this.props.selectedTaxon.name} id={this.props.selectedTaxon.id}/>
  </div>
  }
}