import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import post from '../js/post'
import Router from 'next/router'
import styles from '../styles/login.module.css'

export default function Home({ }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState({});
  const [isLogin, setIsLogin] = useState(true)
  const switcher1 = useRef(null);
  const switcher2 = useRef(null);
  const sec1 = useRef(null);
  const sec2 = useRef(null);


  useEffect(() => {
    switcher1.current.addEventListener('click', function() {
        setEmail("");
        setPassword("");
        setPassword("");
        sec2.current.classList.remove(`${styles.isActive}`);
        sec1.current.classList.add(`${styles.isActive}`);
        setIsLogin(true);
    });
    switcher2.current.addEventListener('click', function() {
      setEmail("");
      setName("");
      sec1.current.classList.remove(`${styles.isActive}`);
      sec2.current.classList.add(`${styles.isActive}`);
      setIsLogin(false);
  });
  }, []);

  let logMeIn = async (email, password) => {

    let res = await post("/api/auth", {email, password})

    setResponse(res);


    if(res.authenticated){
      // create cookie for user
      window.localStorage.setItem("auth", JSON.stringify(res));

      setTimeout(() => {
        Router.push("/projects");
      }, 2000)
    }
  }

  let signMeUp = async (name, email, password) => {
    let res = await post("/api/register", {name, email, password})

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

        

          {/* <p className="description">
            Use the form to login to UIBucket
          </p> */}

          {typeof response.authenticated == "undefined" &&

            // <div className="card">

            // <p className="title">
            //   UIBucket
            // </p>


            // <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            //   <div style={{marginBottom: 5}}>
            //     <input style={{padding: 5}} type="text" placeholder="E-mail Address"
            //           value={email} onChange={(e) => setEmail(e.target.value)}/>
            //   </div>
            //   <div style={{marginBottom: 5}}>
            //     <input style={{padding: 5}} type="password" placeholder="Password"
            //           value={password} onChange={(e) => setPassword(e.target.value)}/>
            //   </div>
            //   <div className='btnholder' style={{marginBottom: 5}}><input style={{padding: 5}} type="submit" value="Login" className='loginbtn' onClick={() => logMeIn(email, password)}/></div>
            // </div>

            //  </div>

            <div className={styles.formSection}>
              <div className={styles.forms}>
                <div ref={sec1} className={`${styles.formWrapper} ${styles.isActive}`}>
                  
                  <button type="button" ref={switcher1} className={`${styles.switcher} ${styles.switcherLogin}`}>
                    Login
                    <span className={styles.underline}></span>
                  </button>
                  <form className={`${styles.form} ${styles.formLogin}`}>
                    
                    <fieldset>
                      <h1 className={styles.title}>UI BUCKET</h1>
                      <legend>Please, enter your email and password for login.</legend>
                      <div className={styles.inputBlock}>
                        <label htmlFor="login-email">E-mail</label>
                        <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputs}></input>
                      </div>
                      <div className={styles.inputBlock}>
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputs}></input>
                      </div>
                    </fieldset>
                    <div type="submit" className={styles.btnLogin} onClick={() => logMeIn(email, password)}>Login</div>
                  </form>
                </div>
                <div ref={sec2} className={styles.formWrapper}>
                  <button type="button" ref={switcher2}  className={` ${styles.switcher} ${styles.switcherSignup} `}>
                    Sign Up
                    <span className={styles.underline}></span>
                  </button>
                  <form className={` ${styles.form} ${styles.formSignup} `}>
                    
                    <fieldset>
                      <h1 className={styles.title}>UI BUCKET</h1>
                      <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                      <div className={styles.inputBlock}>
                        <label htmlFor="signup-name">Name</label>
                        <input className={styles.inputs} id="signup-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}></input>
                      </div>
                      <div className={styles.inputBlock}>
                        <label htmlFor="signup-email">E-mail</label>
                        <input className={styles.inputs} id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                      </div>
                      <div className={styles.inputBlock}>
                        <label htmlFor="signup-password">Password</label>
                        <input className={styles.inputs} id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                      </div>
                    </fieldset>
                    <div type="submit" className={styles.btnSignup} onClick={() => signMeUp(name, email, password) }>Continue</div>
                  </form>
                </div>
              </div>
            </div>

          }

       

        {response.authenticated && isLogin &&
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

        {typeof response.authenticated != "undefined" && !response.authenticated && isLogin &&
          <span>
            <p className="description" style={{color: "red"}}>
              Authentication Unsuccessful, Please check your email and password!
            </p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}><input style={{padding: 5}} type="submit" value="Retry" onClick={() => Router.reload(window.location.pathname)}/></div>

          </span>
        }

        {response.authenticated && !isLogin &&
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

        {typeof response.authenticated != "undefined" && !response.authenticated && !isLogin &&
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
