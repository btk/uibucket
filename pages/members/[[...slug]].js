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
        <title>Members - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <a href="#popup3">
        <div className={"add"} style={{backgroundColor: "#feeadc"}}>+ Add New Member</div>
      </a>

      <div className="popup" id="popup3">
        <div className="popupHolder">
          <h3>Add Member</h3>
          <div className="content">
            <input className="Pinput" type="text" placeholder="Member e-mail address" name="fontTerm" required></input>

            <button type="submit" className="btn">Add Member</button>
            <a className="close" href="#">&times;</a>
          </div>
        </div>
      </div>


      <Sidebar projectId={id}/>

      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>


        <h2 style={{fontSize: 20}}>
          Members
        </h2>

        {project.teamLeader &&
          <>
            <h3>Team Leader</h3>
            <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              {project.teamLeader.name} ({project.teamLeader.email})
            </p>


            <h3>Team Members</h3>
            {!project.teamMembers &&
              <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                <span>No team members.</span>
              </p>
            }
            {project.teamMembers && project.teamMembers.map((member, i) => {
              return <p style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}} key={i}>{member.name} ({member.email})</p>
            })}
          </>
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
