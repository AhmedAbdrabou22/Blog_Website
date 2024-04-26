"use client"
import { useParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import "@/app/user/user.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const page = () => {
  const id = useParams();
  const [post, setPost] = useState([]);
  const posts = () => {
    axios.get(`https://662a9c1c44e6a79c2a1cbc6f.mockapi.io/serv/v1/main/${id.relatedAbout}`)
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    posts();
  }, [id])



  return (
    <div>
      {
        post ? (
          <div key={post.id} className='p-4 font shadow post'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <img src={post.avatar} className='mx-2 profileImage' />
                <span>{post.name}</span>
              </div>
            </div>
            <div className='mt-3'>
              {post.desc}
            </div>

            <div className='reacts' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <div className='mx-3'>
                {post.likes}
                <FaHeart style={{ marginLeft: '10px', color: "red" }} />
              </div>

              <div className='mx-3'>
                {post.love}
                <GrLike style={{ marginLeft: '10px', color: "blue" }} />
              </div>
            </div>
          </div>
        ) : (null)
      }



      {/* Render comments if available, otherwise show "No Comments" */}
      {post && post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div key={index} className='p-4 font shadow post'>
            <p>Comment {index + 1}</p>
            {comment.comment}
          </div>
        ))
      ) : (
        <div className='p-4 font shadow post'>
          <p>No Comments</p>
        </div>
      )}
    </div>
  )
}

export default page











