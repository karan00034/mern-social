import { Box } from "@mui/material";

const getImageSrc = (url) => {
  // Assuming local paths start without "http" or "https"
  if (!url.startsWith("http") && !url.startsWith("https")) {
    return `https://mern-social-5hh6.vercel.app/assets/${url}`;
  }
  return url; // This should be a Firebase URL
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
