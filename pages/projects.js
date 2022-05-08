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
    }else{
      if(typeof window != "undefined"){
        window.location = "/";
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
    <div className="container_Project">
      <Head>
        <title>Projects - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div onClick={() => logMeOut()} style={{cursor: "pointer", position: "fixed", top: 20, left: 20, background: "#000", color: "#fff", padding: 10, borderRadius: 5}}>
        Log out
      </div>

      <main>

        <h1 className="title">
          My Projects
        </h1>

        <p className="description">
          Hello <b>{userObject.name}</b>! Here is a list of your projects;
        </p>

        <p className="description" style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          {projects.length == 0 &&
            <div style={{display: "flex", width: 250, height: 160, justifyContent: "center", alignItems: "center"}}><span>Projects loading...</span></div>
          }
          {projects.length != 0 && projects.map((project, i) => {
            console.log(project)
              return (
                <Project key={i} project={project}/>
              )
            })
          }
        </p>

        <a href="#popup1" className="float">
          <i className="fa fa-plus my-float"></i>
        </a>

	        <div className="popup" id="popup1">
		        <h3>Create Project</h3>
		        <div className="content">
              <input className="Pinput" type="text" placeholder="Enter Project Name" name="ProjectName" required></input>

              <button type="submit" className="btn">Create</button>
              <a className="close" href="#">&times;</a>
		        </div>
          </div>


      </main>


    </div>
  )
}
