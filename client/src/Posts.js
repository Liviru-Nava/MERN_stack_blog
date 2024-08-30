import React, { useEffect, useState } from 'react';
import api from './api';

function Posts(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async () =>{
            try{
                const response = await api.get("/");
                setPosts(response.data);
            }catch(err){
                console.error("Error fetching posts: ", err);
            }
        };

        fetchPosts();
    },[]);

    return(
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map(post=>(
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;