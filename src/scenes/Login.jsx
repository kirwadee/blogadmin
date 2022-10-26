import React, { useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk, reset } from "../features/user/userSlice";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const LoginContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
});

const FormWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  border: "1px solid gray",
  padding: "20px",
}));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errState, setErrState] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrState(errorMessage);
    }
    if (isSuccess) {
      setEmail("");
      setPassword("");
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, errorMessage, isSuccess, navigate, dispatch]);

  const canSaveData = [email, password].every(Boolean) && !isLoading;

  const handleLogin = (e) => {
    e.preventDefault();

    if (canSaveData) {
      dispatch(loginUserThunk({ email, password }));
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <LoginContainer>
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mb: "8px" }}
          textAlign="center"
        >
          WELCOME TO BLOG ADMIN PANEL
        </Typography>
        <Typography
          variant="h5"
          color={colors.greenAccent[400]}
          textAlign="center"
        >
          Please login to get most out of it
        </Typography>
      </Box>
      <form onSubmit={handleLogin}>
        <FormWrapper>
          <Typography textAlign="center" variant="body1">
            Please fill information in the fields below
          </Typography>
          {errState && <Alert severity="error">{errState}</Alert>}

          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibility}
                    onMouseDown={handleMouseDown}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ color: "white" }}
              disabled={!canSaveData}
            >
              Submit
            </Button>
          )}
        </FormWrapper>
      </form>
    </LoginContainer>
  );
};

export default Login;
