import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';
import Vector from '../../components/Vector';


export default function Home({id}) {

  let [project, setProject] = useState({});

  useEffect(() => {

      let getProjectInfo = async () => {
        let projectResponse = await get("/api/project", {id: id});
        setProject(projectResponse);
      }

      getProjectInfo();

  }, [])


  return (
    <div className="container_Project">
      <Head>
        <title>Vectors - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>

      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>


        <h2 style={{fontSize: 20}}>
          Vectors
        </h2>
        <input placeholder="Search" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", border: "1px solid #eee", padding: 10, borderRadius: 10, margin: 5, fontSize: 21, width: "100%"}}/>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {project.vectors && project.vectors.map((vector, i) => {
            return <Vector key={i} vector={vector}/>
          })}
        </div>

      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  let id = slug[0];
  return {
    props: {
      id
    },
  }
}
