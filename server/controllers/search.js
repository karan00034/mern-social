import Post from "../models/Post.js";
import User from "../models/User.js";
export const search=async(req,res)=>{

    try {
        const { query } = req.query;
        console.log(query);
        let users = [];
        let posts = [];
    
        // Check if the query is empty or undefined
        if (query && query.trim() !== '') {
        const regex = new RegExp(`\\b${query}\\b`, 'i');
        // Search for users whose firstName, lastName, or occupation matches the query
         users = await User.find({
          $or: [
              { firstName: regex }, // Use the RegExp object directly
              { lastName: regex },
              { occupation: regex },
          ],
      });

      // Search for posts whose description matches the query
       posts = await Post.find({
          description: regex // Use the RegExp object directly
      });
    }
        // You'll need to define a Post model and adjust this query based on your Post schema
        // For example, searching for posts based on title or content
        // const posts = await Post.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { content: { $regex: query, $options: 'i' } }] });
    
        if(users.length>0){
          
          console.log(users[0].lastName)
        }
        posts.map((post)=>{
          console.log("post description : ",post.description);
        })
        res.status(200).json({ users,posts }); // Include posts if needed in the response
      } catch (err) {
        console.error("error : ",err);
        res.status(500).json({ message: 'Server Error' });
      }
}

