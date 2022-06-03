import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../js/get'
import post from '../js/post'

import Router from 'next/router'
import Link from 'next/link'

import Project from '../components/Project';
import User from '../components/User';


export default function Home({ }) {

  let [userObject, setUserObject] = useState({});
  let [projects, setProjects] = useState([]);

  let [projectName, setProjectName] = useState("");
  let [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    let authCheck = async () => {
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

    }

    authCheck();
    let interval = setInterval(() => {
      authCheck();
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  let logMeOut = () => {
    window.localStorage.setItem("auth", "");
    setTimeout(() => {
      window.location = "/";
    }, 100);
  }

  let createProject = async() => {
    let creating = await post(`/api/projectAdd`, {name: projectName, description: projectDescription, teamLeader: userObject});

    Router.push(`/projects`);
    setTimeout(() => {
      Router.reload();
    }, 100);
  }

  return (
    <div className="container_Project">
      <Head>
        <title>Projects - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href="#popup1">
        <div className={"add"} style={{backgroundColor: "#dcf2fe"}}>+ Create Project</div>
      </a>

      <div className="popup" id="popup1">
        <div className="popupHolder">
          <h3>Create Project</h3>
          <div className="content">
            <input className="Pinput" type="text" placeholder="Enter Project Name" onChange={(e) => setProjectName(e.target.value)} required></input>
            <textarea className="Pinput" type="text" placeholder="Enter Project Description" onChange={(e) => setProjectDescription(e.target.value)} required></textarea>

            <button type="submit" className="btn" onClick={() => createProject()}>Create</button>
            <a className="close" href="#">&times;</a>
          </div>
        </div>
      </div>

      <User />

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
