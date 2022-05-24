import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import User from './User'

export default function Sidebar({ projectId }) {

  return (
    <>
    <User/>
      <div style={{position: "fixed", top: 20, left: 20}}>
        <Link href="/projects">
          <a>
            <div style={{padding: 25}}>
              <img src={"/assets/back.png"}/>
            </div>
          </a>
        </Link>

        <Link href={`/project/${projectId}/`}>
          <a>
            <div style={{padding: 5}}>
              <img src={"/assets/project.png"}/>
            </div>
          </a>
        </Link>

        <Link href={`/vectors/${projectId}`}>
          <a>
            <div style={{padding: 5}}>
              <img src={"/assets/vectors.png"}/>
            </div>
          </a>
        </Link>

        <Link href={`/fonts/${projectId}`}>
          <a>
            <div style={{padding: 5}}>
              <img src={"/assets/fonts.png"}/>
            </div>
          </a>
        </Link>

        <Link href={`/members/${projectId}`}>
          <a>
            <div style={{padding: 5}}>
              <img src={"/assets/members.png"}/>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}
