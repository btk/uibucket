import Head from 'next/head'
import { useState } from 'react'
import post from '../js/post'
import Router from 'next/router'

export default function Home({ }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({});

  let logMeIn = async (email, password) => {
    let res = await post("/api/auth", {email, password})

    setResponse(res);

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
        <title>Login - UIBucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className="title">
          Login
        </h1>

        <p className="description">
          Use the form to login to UIBucket
        </p>

        {typeof response.authenticated == "undefined" &&
          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
            <div style={{marginBottom: 5}}>Email:
              <input style={{padding: 5}} type="text" placeholder="E-mail Address"
                     value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div style={{marginBottom: 5}}>Password:
              <input style={{padding: 5}} type="password" placeholder="Password"
                     value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div style={{marginBottom: 5}}><input style={{padding: 5}} type="submit" value="Login" onClick={() => logMeIn(email, password)}/></div>
          </div>
        }

        {response.authenticated &&
          <span>
            <p className="description" style={{color: "green"}}>
              Authentication Successful, Welcome {response.userObject.name}!
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
              Authentication Unsuccessful, Please check your email and password!
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