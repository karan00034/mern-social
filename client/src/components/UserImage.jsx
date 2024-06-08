import { Box } from "@mui/material";

const getImageSrc = (url) => {
  if(url){
  
  console.log("UserImage component ",url)
  if (url.startsWith("http") || url.startsWith("https")) {
    return url;
  }
  }
    return `https://mern-social-5hh6.vercel.app/assets/${url}`;
};

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={getImageSrc(image)}
      />
    </Box>
  );
};

export default UserImage;
