import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Vector({ vector, add, projectId, size }) {

  let [added, setAdded] = useState(false);
  let isAccepted = typeof vector.accepted != "undefined" && vector.accepted;


  let addThis = () => {
    setAdded(true);
    add();
  }

  let inners = (
      <div className={`vector${typeof add == "function" ? " adding" : ""}`} style={{ width: size == "big" ? 600 : 140, height: size == "big" ? 250 : 160, border: "1px solid #ddd", borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      backgroundColor: isAccepted ? "#dff5e7" : "#fff" }}>
        <img src={vector.url} style={{width: size == "big" ? 150 : 90, height: size == "big" ? 150 : 90}}/>
        {typeof add != "function" && <p>{vector.title}</p>}
        {typeof add == "function" && <div onClick={() => addThis()} className="btn" style={{textAlign: "center", backgroundColor: added ? "green" : "#999", padding: 5, marginTop: 5, borderRadius: 5}}>{added ? "Added" : "Add Vector"}</div>}
        {isAccepted && <div className="accepted">✓</div>}
      </div>
  )

  if(add){
    return inners;
  }else if(projectId){
    return (
      <Link href={`/vector/${projectId}/${vector.id}`}>
        {inners}
      </Link>
    )
  }else{
    return (
      <>
        {inners}
      </>
    )
  }


  /*

    return (
      <Link href={``}>
        <a>
          <div className="vector" style={{ width: 140, height: 160, border: "1px solid #eee", borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img src={vector.url} style={{width: 90, height: 90}}/>
            <p>{vector.title}</p>
            {isAccepted && <div className="accepted">✓</div>}
          </div>
        </a>
      </Link>
    )

  */
}
