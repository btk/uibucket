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
    <div className="container">
      <Head>
        <title>Welcome - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

        <div onClick={() => Router.push("/signup")} style={{cursor: "pointer", background: "#000", color: "#fff", padding: 10, margin: 10, borderRadius: 5}}>
          Sign Up
        </div>
      </main>
    </div>
  )
}
