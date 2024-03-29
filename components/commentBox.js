import { useState } from "react"
import styles from "../styles/commentBox.module.css";

export default function CommentBox ({ comments, sendComment }) {

    const [comment, setComment] = useState("");


    return(
        <div className={styles.commentBox}>
        <br/>
        <big>Comments:</big><br/><br/>

        <div className={styles.comments}>

        {comments.length != 0 && comments.map((comment, i) => {
              return (
                <div className={styles.comment} key={i}>
                    <span className={styles.writer}>{comment.writer}</span>
                    <span className={styles.commentText}>{comment.commentText}</span>
                </div>
              )
        })

        }
        {comments.length == 0 && <p style={{textAlign: "center", paddingTop: 10, opacity: 0.7}}>No Comments yet, be the first to voice your opinion.</p>}
        </div>
        <div className={styles.commentWrite}>
            <input type="text" className={styles.commentInput} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment here!"/>
            <div className={styles.commentSend} onClick={()=>{setComment(""); sendComment(comment)}}><span className={styles.btnName}>Send</span></div>
        </div>

    </div>
    )
}
