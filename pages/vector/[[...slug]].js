import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import post from '../../js/post'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';
import Vector from '../../components/Vector';

export default function Home({id, assetId}) {

  let [project, setProject] = useState({});

  let asset = project.vectors && project.vectors.filter(icon => icon.id == assetId)[0];
  let isAccepted = false;

  if(project.vectors){
    isAccepted = typeof asset.accepted != "undefined" && asset.accepted;
  }

  let removeConfirm = async () => {
    if (confirm(`Do you want to remove ${asset.title}?`) == true) {
      let adding = await post(`/api/vectorRemove`, {id, assetId});
      Router.push(`/vectors/${id}`);
    }
  }


  let makeUsable = async (usableStatus) => {
    let adding = await post(`/api/vectorUsable`, {id, assetId, usableStatus});
    Router.reload();
  }

  useEffect(() => {

      let getProjectInfo = async () => {
        let projectResponse = await get("/api/project", {id: id});
        setProject(projectResponse);
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
        <title>Vector: {asset && asset.title} - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>


      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>

        <div style={{flexDirection: "row", display: "flex"}}>
          <div style={{marginRight: 30, width: 600}}>
          {asset &&
            <>
              <h2 style={{fontSize: 20}}>
                Vector: {asset.title} ({asset.id})
              </h2>

              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", backgroundColor: "#eee", borderRadius: 10, width: 600}}>
                <Vector vector={asset} size={"big"}/>
              </div>

              <h2 style={{fontSize: 20}}>
                Comments (WIP)
              </h2>

              <div>
                <p><b>Burak: </b> I think we can use this</p>
                <p><b>Omar: </b> Maybe something bolder</p>
              </div>

            </>
          }
          </div>
          <div style={{borderLeft: "1px solid #ddd", padding: 20}}>
          <big>Rating:</big><br/><br/>
          Like (10) Dislike (5)
          <br/>
          <br/>
          <br/>
          <big>Actions:</big><br/><br/>
          <div onClick={() => makeUsable(isAccepted ? false : true)} style={{color: "#fff", backgroundColor: isAccepted ? "green" : "blue", textAlign: "center", padding: 5, marginTop: 5, borderRadius: 5, cursor: "pointer"}}>{isAccepted ? "Usable" : "Make Usable"}</div>
          <div onClick={() => removeConfirm()} style={{color: "red", padding: 5, marginTop: 5, borderRadius: 5, cursor: "pointer"}}>Remove Asset</div>

          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  let id = slug[0];
  let assetId = slug[1];
  return {
    props: {
      id, assetId
    },
  }
}
