import Router from 'next/router'
import styles from '../styles/project.module.css'

export default function Project({ project, isAdmin, setPID}) {


  let openProject = () => {
    Router.push(`/project/${project._id}`)
  }


 let stopButton = (event) => {
    event.stopPropagation();
    setPID(project._id);
 }


  return (


    <div onClick={()=>{openProject()}}>
      <a>
        <div className={styles.container}>
          <div className={styles.card} >
            <div className={styles.titlebox}>
              <h1 className={styles.title}>{project.name}</h1>
              <small className={styles.leader}>Team Leader: {project.teamLeader.name}</small>
            </div>
            {isAdmin &&
            <div className={styles.contentbox}  >
              <a href='#renamepopup' onClick={(e)=>{stopButton(e)}} className={styles.projectlink}>Rename</a>
              <a href='#deletepopup' onClick={(e)=>{stopButton(e)}} className={styles.projectlink}>Delete</a>
            </div>
            }

          </div>
        </div>
      </a>
    </div>

  )
}
