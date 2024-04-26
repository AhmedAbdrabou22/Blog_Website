'use client'
import React, { useEffect, useState } from 'react'
import "@/app/user/user.css"
import axios from "axios"
import Link from 'next/link';
import { FaHeart } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const page = () => {
  const [post, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fetchPosts = () => {
    axios
      .get('https://662a9c1c44e6a79c2a1cbc6f.mockapi.io/serv/v1/main')
      .then((res) => {
        setPosts(res.data);
        setFilteredPosts(res.data); // Initialize filtered posts with all posts
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter posts based on the search term
    const filtered = post.filter((post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };


  return (
    <>
      <div>
        <div className='w-75 m-auto text-center'>
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={handleSearch}
            className='search'
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className='text-center font fs-3'>No posts found.</div>
        ) : (
          filteredPosts.map((item) => (
            <div key={item.id} className="p-4 font shadow post">
              <div className="d-flex justify-content-between align-items-center">
                <div  className='d-flex'>
                  <img src={item.avatar} className="mx-2 profileImage" alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p> Category : {item.category}</p>
                  </div>
                </div>
                <Link href={`/about/${item.id}`}>
                  <FaRegArrowAltCircleRight />
                </Link>
              </div>
              <div className="mt-3">{item.desc}</div>
              <div
                className="reacts"
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}
              >
                <div className="mx-3">
                  {item.likes}
                  <FaHeart style={{ marginLeft: '10px', color: 'red' }} />
                </div>
                <div className="mx-3">
                  {item.love}
                  <GrLike style={{ marginLeft: '10px', color: 'blue' }} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default page
