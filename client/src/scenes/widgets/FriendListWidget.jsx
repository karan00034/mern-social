import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(`https://mern-social-5hh6.vercel.app/users/${userId}/friends`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error('Error fetching friends:', error);
      // You may want to dispatch an action or set state to handle the error
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderFriends = () => {
    if (Array.isArray(friends) && friends.length > 0) {
      const uniqueFriends = Array.from(new Set(friends.map((friend) => friend._id)))
        .map((_id) => friends.find((friend) => friend._id === _id));

      return uniqueFriends.map((friend) => (
        <Friend
          key={friend._id}
          friendId={friend._id}
          name={`${friend.firstName} ${friend.lastName}`}
          subtitle={friend.occupation}
          userPicturePath={friend.picturePath}
        />
      ));
    } else {
      return (
        <Typography color={palette.neutral.dark}>
          No friends to display.
        </Typography>
      );
    }
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {renderFriends()}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
