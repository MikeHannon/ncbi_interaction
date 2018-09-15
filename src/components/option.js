import * as React from 'react'
import axios from 'axios'

function Option({taxa}){
  const {id, name} = taxa
  return (<option>{taxa.name}</option>)
}

export default Option