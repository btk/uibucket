import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function User() {
  let [userObject, setUserObject] = useState({});

  useEffect(() => {
    let authCheck = async () => {
      let authString = window.localStorage.getItem("auth");
      if(authString){
        let auth = JSON.parse(authString);
        setUserObject(auth.userObject);
      }

    }

    authCheck();
  }, [])


  let logMeOut = () => {
    window.localStorage.setItem("auth", "");
    setTimeout(() => {
      window.location = "/";
    }, 100);
  }

  return (
    <div className="user">
      <div><img src="https://www.svgrepo.com/show/157054/avatar.svg" style={{width: 40, height: 40, borderRadius: 20}}/></div>
      <div>
        <div style={{fontWeight: "bold"}}>{userObject.name}</div>
        <div>{userObject.email}</div>
      </div>
      <div onClick={() => logMeOut()} style={{cursor: "pointer"}}><img src="https://www.svgrepo.com/show/135250/logout.svg" style={{width: 20, height: 20, position: "relative", top: 12, left: 20}}/></div>
    </div>
  )
}
