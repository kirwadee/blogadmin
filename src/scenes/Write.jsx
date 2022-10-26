import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const WritePostContainer = styled(Box)(({ theme }) => ({
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
}));

const ImageDiv = styled(Box)(() => ({
  justifyContent: "start",
}));

const Write = () => {
  const state = useLocation().state;

  console.log(state);

  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [file, setFile] = useState("");
  const [img, setImg] = useState(state?.img || undefined);
  const [imgPerc, setImgPerc] = useState(0);

  const navigate = useNavigate();

  //firebase handling of image
  const uploadPostImageToFirebase = (fileData) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        //upload completed successfully, now we can get the download uRL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    file && uploadPostImageToFirebase(file);
  }, [file]);

  //end of firebase image handling

  const canSaveData = [title, desc, img].every(Boolean);

  const handlePostAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      state
        ? await axios.put(
            `https://personofinterestadmin.herokuapp.com/api/posts/${state._id}`,
            {
              title: title,
              desc: desc,
            }
          )
        : await axios.post("/posts", {
            title: title,
            desc: desc,
            img: img,
          });

      navigate("/");
    } catch (error) {
      // setErrorMessage(error.response.data)
    }
  };

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <WritePostContainer>
      <Header
        title="WRITE POST"
        subtitle="Upload image title and description"
      />
      <ImageDiv>
        {imgPerc > 0 ? (
          <Typography my={1} variant="caption">
            {"Uploading:" + imgPerc + "%"}
          </Typography>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2} mt={1} mb={1}>
            <Button
              variant="outlined"
              component="label"
              sx={{ color: "inherit", textTransform: "none" }}
            >
              Select Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <PhotoCamera />
            </IconButton>
          </Stack>
        )}
      </ImageDiv>
      <TextField
        autoFocus
        type="text"
        fullWidth
        placeholder="Title"
        sx={{ border: "1px solid lightgray" }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        type="text"
        fullWidth
        placeholder="Description"
        multiline
        rows={8}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ color: "inherit", textTransform: "none" }}
        onClick={handlePostAddOrUpdate}
        disabled={!canSaveData}
      >
        Publish Post
      </Button>
    </WritePostContainer>
  );
};

export default Write;
