import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    SendOutlined
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import state, { setPost } from "state";

  
  const PostWidget= ({ postId,postUserId,name,description,location,picturePath,userPicturePath,likes,comments, }) =>{


    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState(""); 
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
   // const isLiked = Boolean(likes[loggedInUserId]);
   const isLiked = likes && likes[loggedInUserId] ? Boolean(likes[loggedInUserId]) : false;
  



  
   // const likeCount = Object.keys(likes).length;
   const likeCount = likes ? Object.keys(likes).length : 0;
  

   const patchLike = async () => {
    const response = await fetch(`https://mern-social-5hh6.vercel.app/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
    

  /*const postComment = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, text: newComment }), // Include the user ID and comment text
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment(""); // Clear the comment input after posting
  };
  */

  const postComment = async () => {
    const response = await fetch(`https://mern-social-5hh6.vercel.app/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, text: newComment }), // Include the user ID, user name, and comment text
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment(""); // Clear the comment input after posting
  };

    
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
               <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.text}
              </Typography>
            </Box>
          ))}
          <Divider />


          <Box display="flex" alignItems="center" mt="0.5rem">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{ flex: 1, marginRight: "0.5rem", border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
            />
            <IconButton onClick={postComment}>
              <SendOutlined /> {/* Assuming you have a send icon */}
            </IconButton>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
  }

  export default PostWidget;
