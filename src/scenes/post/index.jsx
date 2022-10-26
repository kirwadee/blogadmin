import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { blue, blueGrey, red } from "@mui/material/colors";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const SinglePostContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  margin: "20px",
  flexDirection: "column",
}));

const UserDiv = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
}));

const InfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const EditContainer = styled(Box)(() => ({
  display: "flex",
  gap: "5px",
}));

const PostView = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [user, setUser] = useState({});
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDataAndUserData = async () => {
      try {
        //get the particular post
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);

        //fetch the user who posted this post also
        const userRes = await axios.get(`/users/profile/${res.data.userId}`);
        setUser(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostDataAndUserData();
  }, [postId]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //IF NO USER NAVIGATE TO LOGIN

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <SinglePostContainer>
      {/* POST IMAGE */}
      <Box
        component="img"
        src={post?.img}
        alt={post.title}
        sx={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
        }}
      />

      <UserDiv>
        {/* USER IMAGE */}
        <Box
          component="img"
          src={user?.profilePic}
          alt={user?.username}
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: blueGrey[900],
          }}
        />

        {/* USER PARTICULARS */}
        <InfoWrapper>
          <Typography variant="h6" fontSize={16}>
            {user?.username}
          </Typography>

          <Typography variant="h6" fontSize={14}>
            Posted {moment(post.createdAt).fromNow()}
          </Typography>
        </InfoWrapper>

        {/* EDIT OR DELETE POST */}
        <EditContainer>
          <IconButton
            LinkComponent={Link}
            to={`/write?edit=${postId}`}
            state={post}
            sx={{ color: blue[200] }}
          >
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: red[200] }} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </EditContainer>
      </UserDiv>

      <Typography variant="h1" sx={{ fontSize: "34px", color: "#333" }}>
        {post?.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "justify", lineHeight: "30px" }}
      >
        {post?.desc}
      </Typography>
    </SinglePostContainer>
  );
};

export default PostView;
