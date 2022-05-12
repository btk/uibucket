import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'

export default function Project({ project }) {

  return (
    <Link href={`/project/${project._id}`}>
      <a>
        <div style={{ width: 250, height: 150, border: "1px solid #aaa", borderRadius: 10, margin: 5}}>
          <p>{project.name}</p>
          <small>Team Leader: {project.teamLeader.name}</small>
        </div>
      </a>
    </Link>
  )
}
