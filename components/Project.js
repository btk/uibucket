import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styles from '../styles/project.module.css'

export default function Project({ project }) {

  return (
    <Link href={`/project/${project._id}`}>
      <a>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.titlebox}>
              <h1 className={styles.title}>{project.name}</h1>
              <small className={styles.leader}>Team Leader: {project.teamLeader.name}</small>
            </div>
            <div className={styles.contentbox}>
              <a href='' className={styles.projectlink}>Rename</a>
              <a href='' className={styles.projectlink}>Delete</a>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
