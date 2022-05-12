import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Vector({ vector }) {
  return (
    <Link href={``}>
      <a>
        <div style={{ width: 140, height: 160, border: "1px solid #eee", borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <img src={vector.url} style={{width: 90, height: 90}}/>
          <p>{vector.title}</p>
        </div>
      </a>
    </Link>
  )
}
