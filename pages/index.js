import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'

export default function Home({}) {

  let checkCookie = async () => {

    let authString = window.localStorage.getItem("auth");
    if(authString && authString != ""){
      let auth = JSON.parse(authString);

      if(auth.userObject.email){
        setTimeout(() => {
          Router.push("/projects");
        }, 100)
      }
    }

  }

  useEffect(() => {
    if(typeof (window) != "undefined"){
      checkCookie();
    }
  }, [])

  return (
    <>

    <div className="home">

    <section className="sdefault section1">
      <div className="leftlead">
          <img className="imglead" src='/assets/community.png'/>
      </div>
      <div className="rightlead">
          <img src={"/logo.svg"} style={{width: 200}}/>
          <h1 className='section_title' style={{color: "#111"}}>Asset Sharing Platform</h1>
          <p className='section_info' style={{color: "#111"}}>Our application offers a platform to share all vectors/fonts with your colleages in any software development project</p>

          <div className="start">
              <a onClick={()=> Router.push("/login")}>Start Now!</a>
          </div>
      </div>
    </section>
    <section className="sdefault section2">
      <div className="leftlead">
          <img className="imglead" src="../assets/opinion.png"/>
      </div>
      <div className="rightlead">
          <h1 className='section_title'>Your Opinion matters</h1>
          <p className='section_info'>In this platform, you will be able to vote for the best choices and add your comment asset to help find the best set of assets for the project.</p>
      </div>
    </section>
    <section className="sdefault section3">
      <div className="leftlead">
          <img className="imglead" src="../assets/computer.png"/>
      </div>
      <div className="rightlead">
          <h1 className='section_title'>Easy to use App</h1>
          <p className='section_info'>The platform is so easy to use with non-complex user interface and amazing nice features that will just make your programming life easier!</p>
      </div>
    </section>
    <section className="sdefault section4">
        <div className="start">
            <a onClick={()=> Router.push("/login")}>Start Now!</a>
        </div>
    </section>
    <Head>
      <title>Welcome - UIBucket</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

      {/*

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">UIBucket!</a>
        </h1>

        <p className="description">
          Get started by loging in or signing up.
        </p>

        <div onClick={() => Router.push("/login")} style={{cursor: "pointer", background: "#000", color: "#fff", padding: 10, margin: 10, borderRadius: 5}}>
          Log In
        </div>

        <div onClick={() => Router.push("/login")} style={{cursor: "pointer", background: "#000", color: "#fff", padding: 10, margin: 10, borderRadius: 5}}>
          Sign Up
        </div>
      </main> */}
    </div>

    </>
  )
}
