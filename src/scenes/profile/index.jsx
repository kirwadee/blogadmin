import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

const ProfileUpdate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://personofinterestadmin.herokuapp.com/api/users/profile/${id}`
      );
      setUsername(res.data.username);
      setEmail(res.data.email);
    };
    getUser();
  }, [id]);

  const [username, setUsername] = useState("");
  console.log(username);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${id}`, { username, email });
      console.log(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE USER" subtitle="Update your account" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="UserName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileUpdate;
