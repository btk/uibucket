//   const fonts = await get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA1whkxzFwdyzUUtFjkcxgdtmU_9TmxbGA");
import Head from 'next/head'
import { useState, useEffect } from 'react'
import get from '../../js/get'
import post from '../../js/post'
import Router from 'next/router'

import Project from '../../components/Project';
import Sidebar from '../../components/Sidebar';
import Font from '../../components/Font';


export default function Home({id}) {

  let [project, setProject] = useState({});
  let [term, setTerm] = useState("");

  let [addTerm, setAddTerm] = useState("");
  let [addResults, setAddResults] = useState([]);

  let addFont = async (font) => {
    let adding = await post(`/api/fontAdd`, {id, font});
  }

  let add = async () => {
    Router.push(`/fonts/${id}`);
    setTimeout(() => {
      Router.reload();
    }, 100);
  }

  useEffect(() => {
    fetchFonts();
  }, [addTerm])

  let fetchFonts = async () => {
    if(addTerm.length >= 2){
      let fonts = await get(`/api/searchFonts`, { search: addTerm, limit: 5, key: `AIzaSyA1whkxzFwdyzUUtFjkcxgdtmU_9TmxbGA`})
      setAddResults(fonts);
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
        return arr.family.toLowerCase().includes(term.toLowerCase()) || arr.category.toLowerCase().replace("-", " ").includes(term.toLowerCase());
      })
    }else{
      return searchableArray;
    }
  }

  return (
    <div className="container_Project">
      <Head>
        <title>Fonts - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar projectId={id}/>

      <a href="#popup2">
        <div className={"add"} style={{backgroundColor: "#e6fedc"}}>+ Add New Font</div>
      </a>

      <div className="popup" id="popup2">
        <div className="popupHolder">
          <h3>Add Font</h3>
          <div className="content">
            <input className="Pinput" type="text" placeholder="Search fonts to add" onChange={(e) => setAddTerm(e.target.value)} required></input>
            <p>Results for {addTerm}</p>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {addResults.map((font, i) => {
                return <Font key={i+font.family} font={font} add={() => addFont(font)}/>
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
          Fonts
        </h2>
        <input placeholder="Search" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", border: "1px solid #eee", padding: 10, borderRadius: 10, margin: 5, fontSize: 21, width: "90%"}}
          onChange={ (event) => setTerm(event.target.value) }
          />

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {project.fonts && filterSearch(project.fonts).map((font, i) => {
            return <Font key={i} font={font} projectId={id}/>
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
