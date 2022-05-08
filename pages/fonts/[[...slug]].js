import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';


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
        <title>Fonts - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>

      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>


        <h2 style={{fontSize: 20}}>
          Fonts
        </h2>
        <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          {JSON.stringify(project)}
        </p>

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
