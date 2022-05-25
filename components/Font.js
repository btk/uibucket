import Head from 'next/head'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Font({ font, add, projectId }) {

  let [added, setAdded] = useState(false);
  let isAccepted = typeof font.accepted != "undefined" && font.accepted;

  useEffect(() => {

    (async () => {
      const WebFont = await import('webfontloader');
      WebFont.load({
        google: {
          families: [font.family],
        },
      });
    })();

   }, []);

  let addThis = () => {
    setAdded(true);
    add();
  }

  let inners = (
    <div className={`font${typeof add == "function" ? " adding" : ""}`} style={{ width: 600, border: "1px solid #ddd", borderRadius: 10, margin: 5, padding: 10, display: "flex", flexDirection: "column", justifyContent: "center",
    backgroundColor: isAccepted ? "#dff5e7" : "#fff" }}>
      <div style={{fontSize: 15, fontWeight: "bold", marginBottom: 5}}>{font.family}</div>
      <div style={{fontSize: 24, fontFamily: `${font.family}`}}>The quick brown fox jumps over the lazy dog</div>
      {typeof add != "function" && <p>{font.category}</p>}
      {typeof add == "function" && <div onClick={() => addThis()} className="btn" style={{textAlign: "center", backgroundColor: added ? "green" : "#999", padding: 5, marginTop: 5, borderRadius: 5}}>{added ? "Added" : "Add Font"}</div>}
      {isAccepted && <div className="accepted">✓</div>}
    </div>
  )

  if(add){
    return inners;
  }else{
    return (
      <Link href={`/font/${projectId}/${font.family.replace(/ /g, "-")}`}>
        {inners}
      </Link>
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
