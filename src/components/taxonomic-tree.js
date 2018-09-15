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
  'species'
]
export default class TaxonomicTree extends React.Component {
  state = {lineage:[]}
  componentDidMount(){
    this.updateTaxonInformation()
   
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      this.updateTaxonInformation()
    }
  }

  updateTaxonInformation = ()=>{
    axios.get(`http://takehome.onecodex.com/api/taxonomy/${this.props.selectedTaxon.id}`).then(result=>{console.log(result)})
    axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=taxonomy&id=${this.props.selectedTaxon.id}`).then(result=>{
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(result.data,"text/xml");
      const lineage = xmlDoc.getElementsByTagName("Lineage")[0].childNodes[0].nodeValue.split(';');
      this.setState((state)=>({...state, lineage }))}).catch((e)=>{console.log(e)})
  }
  render(){
  return <div>
  {this.state.lineage.map((level, idx)=> (<p className={CLASSIFICATIONS[idx]} key={level+CLASSIFICATIONS[idx]}> {CLASSIFICATIONS[idx]} - {level} </p>) )}
  <LearnMore name={this.props.selectedTaxon.name} id={this.props.selectedTaxon.id}/>
  </div>
  }
}