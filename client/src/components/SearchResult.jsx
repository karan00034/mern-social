import React, { useState ,useEffect} from 'react';
import { Box, Typography, TextField, Button,useMediaQuery ,useTheme ,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,} from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from 'scenes/widgets/UserWidget';
import PostWidget from 'scenes/widgets/PostWidget';
import { useLocation } from 'react-router-dom';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import Friend from './Friend';
import WidgetWrapper from './WidgetWrapper';
import FlexBetween from './FlexBetween';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch} from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import MyPostWidget from 'scenes/widgets/MyPostWidget';



const SearchResult = () => {

  
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('q'));
  //setSearchQuery(queryParams.get('q'));
  const [searchResults, setSearchResults] = useState([]);
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {palette}=useTheme();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;



  const handleSearch = async () => {
    try {
      const response = await fetch(`https://mern-social-5hh6.vercel.app/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      //setSearchResults(data);

      const filteredPosts = data.posts.filter(post =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults({ ...data, posts: filteredPosts });
  
      const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('q', searchQuery);
    window.history.replaceState(null, '', `${location.pathname}?${newSearchParams.toString()}`);

    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(()=>{
    handleSearch();
  },[searchQuery]);

  return (
    <Box>
      
      
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Social media 
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
  
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
  
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"

            
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
  
            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>



      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="left">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />

        </Box>

          
        <Box 
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
        {searchResults.posts && (
          <Box>
            <Typography variant="h5" gutterBottom>
              <WidgetWrapper>
                Posts
              </WidgetWrapper>
            </Typography>
               {
                
          searchResults.posts.map(
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
          )
               }    
             </Box>
        )}</Box>


         <Box flexBasis="26%">         
        {searchResults.users && (
          <Box>
            <Typography variant="h5" gutterBottom>
            <WidgetWrapper>
              Users
            </WidgetWrapper>
            </Typography>

            
            <Box display="flex" gap={1} flexDirection="column" >
              {searchResults.users.map((user) => (<>
                
          <WidgetWrapper>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: '1.5rem' }}
          >
          </Typography>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            
          <Friend
        friendId={user._id}
        name={user.firstName}
        subtitle={user.location}
        userPicturePath={user.picturePath}
      />
          </Box>
        </WidgetWrapper>
              
              </>))}
            </Box>
          </Box>
        )}</Box>
       
    </Box>




      
    </Box>
  );
};

export default SearchResult;
