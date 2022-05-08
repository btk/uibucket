import Head from 'next/head'
import { useState } from 'react'

export default function Sidebar({ projectId }) {

  return (
    <div style={{position: "fixed", top: 20, left: 20}}>
      <a href="/projects">
        <div style={{padding: 25}}>
          <img src={"/assets/back.png"}/>
        </div>
      </a>

      <a href={`/project/${projectId}/`}>
        <div style={{padding: 5}}>
          <img src={"/assets/project.png"}/>
        </div>
      </a>

      <a href={`/vectors/${projectId}`}>
        <div style={{padding: 5}}>
          <img src={"/assets/vectors.png"}/>
        </div>
      </a>

      <a href={`/fonts/${projectId}`}>
        <div style={{padding: 5}}>
          <img src={"/assets/fonts.png"}/>
        </div>
      </a>

      <a href={`/members/${projectId}`}>
        <div style={{padding: 5}}>
          <img src={"/assets/members.png"}/>
        </div>
      </a>
    </div>
  )
}
