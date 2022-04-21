import Head from 'next/head'
import { useState, useEffect } from 'react'
import post from './js/post'
import Router from 'next/router'

export default function Home({ }) {

  let [userObject, setUserObject] = useState({});

  useEffect(() => {
    let authString = window.localStorage.getItem("auth");
    if(authString){
      let auth = JSON.parse(authString);
      setUserObject(auth.userObject);
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Projects - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className="title">
          Projects
        </h1>

        <p className="description">
          Hello {userObject.name}! Here is a list of your projects;
        </p>

      </main>


    </div>
  )
}
