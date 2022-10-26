import axios from "axios";

//Register user api endpoint service
const login = async (userData) => {
  const response = await axios.post(
    `https://personofinterestadmin.herokuapp.com/api/auth/login`,
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authApiService = {
  login,
};

export default authApiService;
