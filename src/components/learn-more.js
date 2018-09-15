import * as React from 'react';

function LearnMore({name, id}){

  function onClick(){
    window.open(`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${id}&lvl=3&lin=f&keep=1&srchmode=1&unlock`)
  }
  return (<div>
    <p> 
    Go to NCBI to learn more about: <button onClick={onClick}> {name} </button>
    </p>
    
    </div>)
}
export default LearnMore 