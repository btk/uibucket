import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import post from '../../js/post'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';
import Vector from '../../components/Vector';


export default function Home({id}) {

  let [project, setProject] = useState({});
  let [term, setTerm] = useState("");

  let [addTerm, setAddTerm] = useState("");
  let [addResults, setAddResults] = useState([]);

  let addVector = async (vector) => {
    let adding = await post(`/api/vectorAdd`, {id, vector});
  }

  let add = async () => {
    Router.push(`/vectors/${id}`);
    setTimeout(() => {
      Router.reload();
    }, 100);
  }

  useEffect(() => {
    fetchVectors();
  }, [addTerm])

  let fetchVectors = async () => {
    if(addTerm.length >= 2){
      let icons = await get(`/api/searchVectors`, { search: addTerm, limit: 8})
      setAddResults(icons);
    }
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

  let filterSearch = (searchableArray) => {
    if(term){
      return searchableArray.filter(arr => {
        return arr.title.toLowerCase().includes(term.toLowerCase());
      })
    }else{
      return searchableArray;
    }
  }

  return (
    <div className="container_Project">
      <Head>
        <title>Vectors - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>

      <a href="#popup2">
        <div className={"add"} style={{backgroundColor: "#fae1ff"}}>+ Add New Vector</div>
      </a>

      <div className="popup" id="popup2">
        <div className="popupHolder">
          <h3>Add Vectors</h3>
          <div className="content">
            <input className="Pinput" type="text" placeholder="Search vectors to add" onChange={(e) => setAddTerm(e.target.value)} required></input>
            <p>Results for {addTerm}</p>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {addResults.map((icon, i) => {
                return <Vector key={i} vector={icon} add={() => addVector(icon)}/>
              })}
            </div>
            <button type="submit" className="btn" onClick={() => add()}>Done!</button>
            <a className="close" href="#">&times;</a>
          </div>
        </div>
      </div>


      <div style={{paddingLeft: 140, paddingTop: 25}}>

        <h1 style={{fontSize: 35}}>
          {project.name}
        </h1>


        <h2 style={{fontSize: 20}}>
          Vectors
        </h2>
        <input placeholder="Search" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", border: "1px solid #eee", padding: 10, borderRadius: 10, margin: 5, fontSize: 21, width: "90%"}}
          onChange={ (event) => setTerm(event.target.value) }
          />

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {project.vectors && filterSearch(project.vectors).map((vector, i) => {
            return <Vector key={i} vector={vector} projectId={id}/>
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
