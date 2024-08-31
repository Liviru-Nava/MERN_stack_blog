import React, { useEffect, useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

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

    const deletePost = async (id) => {
        try{
            await api.delete(`/${id}`);
            setPosts(posts.filter(post => post._id !== id));
        }catch(err){
            console.error("Error deleting post: ", err);
        }
    };
    return(
        <div>
            <h1>Blog Posts</h1>
            <div>
                <h2>View Posts</h2>
                {posts.length > 0 ? (
                    posts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <Link to={`/update-post/${post._id}`}>
                            <button>Edit Post</button>
                        </Link>
                        <button onClick={()=>deletePost(post._id)}>Delete Post</button>
                    </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
}

export default Posts;