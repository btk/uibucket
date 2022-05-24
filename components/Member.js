import Head from 'next/head'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Member({ member, remove }) {

  let removeConfirm = () => {
    if (confirm(`Do you want to remove ${member.name}?`) == true) {
      remove();
    }
  }

  return (
    <div className={`member`} style={{ width: 600, border: "1px solid #ddd", borderRadius: 10, margin: 5, padding: 10, display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <div style={{fontSize: 15, fontWeight: "bold", marginBottom: 5}}>{member.name}</div>
      <div style={{fontSize: 18}}>{member.email}</div>
      {typeof remove == "function" && <div onClick={() => removeConfirm()} style={{color: "red", padding: 5, marginTop: 5, borderRadius: 5, cursor: "pointer"}}>Remove Member</div>}
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
