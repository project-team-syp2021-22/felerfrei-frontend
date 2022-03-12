import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, SET_USER } from "../redux/userActions";
import { API_URL } from "./constants";
import { Container, Spinner } from "react-bootstrap";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

// TODO: redux store for storing user data

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userToken, setUserToken, removeCookie] = useCookies(["token"]);
  const tokenKey = "token";

  let userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function signup(email, password, firstname, lastname, telephonenumber) {
    await axios
      .post(`${API_URL}/auth/signup`, {
        email,
        password,
        firstname,
        lastname,
        telephone: telephonenumber,
      })
      .then((res) => {
        if (res.status != 200) throw new Error(res.data.message);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }

  async function login(email, password) {
    setLoading(true);
    await axios
      .post(API_URL + "/auth/login", { email: email, password: password })
      .then((response) => {
        let data = response.data;
        let credentials = {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          telephone: data.telephone,
        };
        setUser({ ...credentials });

        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);

        setUserToken(tokenKey, data.token, { expires: expireDate });
        // store.dispatch({ type: SET_USER, payload: credentials });
        dispatch({ type: SET_USER, payload: { user: credentials } });
      })
    setLoading(false);
  }

  async function logout() {
    setLoading(true);
    removeCookie(tokenKey);
    setUser(null);
    dispatch({ type: LOGOUT });
    setLoading(false);
  }

  async function changeCredentials(
    email,
    password,
    firstname,
    lastname,
    telephonenumber
  ) {
    await axios.post(API_URL + "/auth/changeCredentials", {
      token: userToken[tokenKey],
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      telephone: telephonenumber,
    }).then((res) => {
      login(email, password);
    }).catch((err) => {
      throw new Error(err.response.data);
    });
  }

  useEffect(async () => {
    // check here if user is still available on database
    setLoading(true);
    setUser(null);
    let token = userToken[tokenKey];
    if (token) {
      setUser(userSelector);
      await axios
        .post(API_URL + "/auth/check", { token: token })
        .then((response) => {

        })
        .catch((error) => {
          logout();
        });
    }
    return setLoading(false);
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    changeCredentials,
    userToken
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {loading && (
        <Container
          className="d-flex justify-content-center"
          style={{ height: "100%" }}
        >
          <Spinner className="align-self-center" animation="border" />
        </Container>
      )} */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
