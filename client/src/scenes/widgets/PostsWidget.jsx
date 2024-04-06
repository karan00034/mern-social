import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";


const PostsWidget=({ userId,isProfile=false })=>{
    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    const token=useSelector((state)=>state.token);

    const getPosts=async()=>{
      try {
        const response = await fetch(
          "http://localhost:3001/posts",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const data = await response.json();
        if (Array.isArray(data)) {
          dispatch(setPosts({ posts: data }));
        } else {
          throw new Error("Fetched data is not an array of posts");
        }
      } catch (error) {
        console.log("Failed to get posts:", error.message);
      }           
    }


    
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("number of posts ",posts.length);
  return (
    <>
      {posts && posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );

}

export default PostsWidget;