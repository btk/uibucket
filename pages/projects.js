import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../js/get'
import Router from 'next/router'

import Project from '../components/Project';


export default function Home({ }) {

  let [userObject, setUserObject] = useState({});
  let [projects, setProjects] = useState([]);

  useEffect(async () => {
    let authString = window.localStorage.getItem("auth");
    if(authString){
      let auth = JSON.parse(authString);
      setUserObject(auth.userObject);

      if(auth.userObject.email){
        let projectsResponse = await get("/api/projects", {email: auth.userObject.email});
        setProjects(projectsResponse);
      }
    }

  }, [])

  let logMeOut = () => {
    window.localStorage.setItem("auth", "");
    setTimeout(() => {
      window.location = "/";
    }, 100);
  }

  return (
    <div className="container">
      <Head>
        <title>Projects - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div onClick={() => logMeOut()} style={{cursor: "pointer", position: "fixed", top: 20, left: 20, background: "#000", color: "#fff", padding: 10, borderRadius: 5}}>
        Log out
      </div>

      <main>

        <h1 className="title">
          Projects
        </h1>

        <p className="description">
          Hello {userObject.name}! Here is a list of your projects;
        </p>

        <p className="description">
          {projects.length != 0 && projects.map((project, i) => {
              return (
                <Project key={i} project={project}/>
              )
            })
          }
        </p>
      </main>


    </div>
  )
}
