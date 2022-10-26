import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

const StyledCardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Access = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ListWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  // FETCHING LATEST 5 POSTS AND LATEST 5 USERS
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);

        //FETCH USERS
        const resp = await axios.get("/users");
        setUsers(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}

      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Access display="flex">
        <StyledCardWrapper>
          <Card
            sx={{
              background: colors.blueAccent[900],
              minWidth: 250,
              maxHeight: 100,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                NUMBER OF POSTS POSTED
              </Typography>
              <Typography variant="h2" fontWeight="bold" component="div">
                {posts.length}
              </Typography>
            </CardContent>
          </Card>
          <ListWrapper>
            <Card
              sx={{
                background: colors.blueAccent[900],
                minWidth: 250,
                maxHeight: 50,
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  LATEST POSTS
                </Typography>
              </CardContent>
            </Card>
            <List>
              {posts.slice(0, 5).map((post, index) => (
                <Box key={post._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        alt={post?.title}
                        src={post?.img}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post?.title}
                      secondary={`Time Created: ${moment(post.createdAt).format(
                        "YYYY-MM-DD H:mm:ss"
                      )}`}
                    />
                  </ListItem>
                  {index !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
            </List>
          </ListWrapper>
        </StyledCardWrapper>

        <StyledCardWrapper>
          <Card
            sx={{
              background: colors.blueAccent[900],
              minWidth: 250,
              maxHeight: 100,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                NUMBER OF ACTIVE USERS
              </Typography>
              <Typography variant="h2" fontWeight="bold" component="div">
                {users?.length}
              </Typography>
            </CardContent>
          </Card>
          <ListWrapper>
            <Card
              sx={{
                background: colors.blueAccent[900],
                minWidth: 250,
                maxHeight: 50,
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  LATEST USERS
                </Typography>
              </CardContent>
            </Card>
            <List>
              {users.slice(0, 5).map((post, index) => (
                <Box key={post._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        alt={post?.title}
                        src={post?.img}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post?.title}
                      secondary={`Time Created: ${moment(post.createdAt).format(
                        "YYYY-MM-DD H:mm:ss"
                      )}`}
                    />
                  </ListItem>
                  {index !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
            </List>
          </ListWrapper>
        </StyledCardWrapper>
      </Access>
    </Box>
  );
};

export default Dashboard;
