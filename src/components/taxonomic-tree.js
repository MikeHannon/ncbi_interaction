import * as React from 'react';
import axios from 'axios';

export default class TaxonomicTree extends React.Component {
  state = {lineage:``}
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
      const lineage = xmlDoc.getElementsByTagName("Lineage")[0].childNodes[0].nodeValue;
      this.setState((state)=>({...state, lineage }))
    }).catch((e)=>{console.log(e)})

  }
  render(){
    return <p> {this.state.lineage} </p>
  }
}