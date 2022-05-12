import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Vector({ vector }) {

  let isAccepted = typeof vector.accepted != "undefined" && vector.accepted;

  return (
    <div className="vector" style={{ width: 140, height: 160, border: "1px solid #ddd", borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    backgroundColor: isAccepted ? "#dff5e7" : "#fff" }}>
      <img src={vector.url} style={{width: 90, height: 90}}/>
      <p>{vector.title}</p>
      {isAccepted && <div className="accepted">✓</div>}
    </div>
  )

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