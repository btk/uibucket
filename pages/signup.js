import Head from 'next/head'
import { useState } from 'react'
import post from '../js/post'
import Router from 'next/router'

export default function Home({ }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({});

  let signMeUp = async (name, email, password) => {
    let res = await post("/api/register", {name, email, password})

    setResponse(res);
    console.log(res);

    if(res.authenticated){
      // create cookie for user
      window.localStorage.setItem("auth", JSON.stringify(res));

      setTimeout(() => {
        Router.push("/projects");
      }, 3000)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Sign Up - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      

        {typeof response.authenticated == "undefined" &&

          <div className="card">

          <p className="title">
            Sign Up
          </p>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{marginBottom: 5}}>
              <input style={{padding: 5}} type="text" placeholder="Your Name"
                     value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div style={{marginBottom: 5}}>
              <input style={{padding: 5}} type="text" placeholder="E-mail Address"
                     value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div style={{marginBottom: 5}}>
              <input style={{padding: 5}} type="password" placeholder="Password"
                     value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div style={{marginBottom: 5}} className="btnholder"><input style={{padding: 5}} className="loginbtn" type="submit" value="Sign Up" onClick={() => signMeUp(name, email, password)}/></div>
          </div>

          </div>
        }
       


        {response.authenticated &&
          <span>
            <p className="description" style={{color: "green"}}>
              Successful Signed Up, Welcome {response.userObject.name}!
            </p>

            <p className="description" style={{}}>
              Please wait while we are logging you in!<br/>
              ...
            </p>
          </span>
        }

        {typeof response.authenticated != "undefined" && !response.authenticated &&
          <span>
            <p className="description" style={{color: "red"}}>
              There was an issue with register, please check your name, email and password!
            </p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}><input style={{padding: 5}} type="submit" value="Retry" onClick={() => Router.reload(window.location.pathname)}/></div>

          </span>
        }

      </main>

      <footer>
        &copy; UIBucket
      </footer>
    </div>
  )
}
