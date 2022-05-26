import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import post from '../../js/post'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';


export default function Home({id}) {

  let [project, setProject] = useState({});
  let [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

      let getProjectInfo = async () => {
        let projectResponse = await get("/api/project", {id: id});
        setProject(projectResponse);

        let authString = window.localStorage.getItem("auth");
        if(authString && authString != ""){
          let auth = JSON.parse(authString);

          if(auth.userObject.email){
            setIsAdmin(projectResponse.teamLeader.email == auth.userObject.email)
          }
        }

      }

      getProjectInfo();
      let interval = setInterval(() => {
        getProjectInfo();
      }, 2000);

      return () => {
        clearInterval(interval);
      }

  }, [])



  let removeConfirm = async () => {
    if (confirm(`Do you want to remove ${project.name}?`) == true) {
      let remove = await post(`/api/projectRemove`, {id: id});
      Router.push(`/projects`);
    }
  }

  return (
    <div className="container_Project">
      <Head>
        <title>{project.name} - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>

      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>


        <h2 style={{fontSize: 20}}>
          Project Details
        </h2>
        <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          Description: {project.description}
        </p>
        <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          Owner: {project.teamLeader && project.teamLeader.name} {isAdmin && <span style={{fontWeight: 600, paddingLeft: 5}}> (You)</span>}
        </p>
        <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap", fontWeight: "bold"}}>
          Project Stats;
        </p>
        <big>
          <p><div style={{width: 20, height: 20, borderRadius: 10, backgroundColor: "#dcf2fe", float: "left", position: "relative", top: 5, marginRight: 5}}></div> <strong>{project.vectors ? project.vectors.length : 0}</strong> Vectors</p>
          <p><div style={{width: 20, height: 20, borderRadius: 10, backgroundColor: "#fae1ff", float: "left", position: "relative", top: 5, marginRight: 5}}></div> <strong>{project.fonts ? project.fonts.length : 0}</strong> Fonts</p>
          <p><div style={{width: 20, height: 20, borderRadius: 10, backgroundColor: "#e6fedc", float: "left", position: "relative", top: 5, marginRight: 5}}></div> <strong>{project.teamMembers ? project.teamMembers.length+1 : 1}</strong> Members</p>
        </big>
        <p></p>
        {isAdmin &&
          <div onClick={() => removeConfirm()} style={{color: "red", padding: 5, marginTop: 5, borderRadius: 5, cursor: "pointer"}}>Remove Project</div>
        }
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
