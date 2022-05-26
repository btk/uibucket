import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import post from '../../js/post'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';
import Member from '../../components/Member';


export default function Home({id}) {

  let [project, setProject] = useState({});
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  let [isAdmin, setIsAdmin] = useState(false);

  let add = async () => {
    if(name && email){
      let adding = await post(`/api/memberAdd`, {id, name, email});
      Router.push(`/members/${id}`);
      setTimeout(() => {
        Router.reload();
      }, 100);
    }else {
      alert("Name or email address can't be empty!");
    }
  }

  let removeMember = async (email) => {
    let remove = await post(`/api/memberRemove`, {id, email});
    Router.push(`/members/${id}`);
    setTimeout(() => {
      Router.reload();
    }, 100);
  }

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


  return (
    <div className="container_Project">
      <Head>
        <title>Members - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAdmin &&
        <a href="#popup3">
          <div className={"add"} style={{backgroundColor: "#feeadc"}}>+ Add New Member</div>
        </a>
      }

      <div className="popup" id="popup3">
        <div className="popupHolder">
          <h3>Add Member</h3>
          <div className="content">
            <input className="Pinput" type="text" placeholder="Member Name" onChange={(e) => setName(e.target.value)} required></input>
            <input className="Pinput" type="text" placeholder="Member e-mail address" onChange={(e) => setEmail(e.target.value)} required></input>

            <button type="submit" className="btn" onClick={() => add()}>Add Member</button>
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
              return <Member key={i} member={member} remove={isAdmin ? () => removeMember(member.email) : false}/>
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
