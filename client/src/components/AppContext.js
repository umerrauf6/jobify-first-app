import React, { useContext, useReducer } from "react";

import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STAT_BEGIN,
  SHOW_STAT_SUCCESS,
  CLEAR_FILTERS,
  PAGE_CHANGE_BEGIN,
  PASS_RESET_SENT,
  PASS_RESET_AUTH,
  PASS_RESET_SUCCESS,
} from "../context.js/action";

const DISPLAY_ALERT = "SHOW_ALERT";
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("userLocation");

const appContext = React.createContext();
const intialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  token: token,
  user: user ? JSON.parse(user) : null,
  userLocation: userLocation || null,
  showSidebar: false,
  isEditing: false,
  setEditId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  status: "pending",
  statusOptions: ["pending", "decline", "interview"],
  jobType: "internship",
  jobTypeOptions: ["full time", "part time", "remote", "internship"],
  jobs: [],
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyStats: [],
  search: "",
  typeStatus: "all",
  typeJob: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  isForgot: false,
  verify: false,
};
function AppProvider({ children }) {
  function reducer(state, action) {
    if (action.type === "CLEAR_FILTERS") {
      return {
        ...state,
        search: "",
        typeStatus: "all",
        typeJob: "all",
        sort: "latest",
      };
    }
    if (action.type === "PASS_RESET_AUTH") {
      return {
        ...state,
        verify: true,
      };
    }
    if (action.type === "PASS_RESET_SUCCESS") {
      return {
        ...state,
        isLoading: true,
        showAlert: true,
        alertText: "Password Changed",
        alertType: "success",
        token: action.payLoad.token,
        user: action.payLoad.user,
        userLocation: action.payLoad.location,
      };
    }
    if (action.type === "PASS_RESET_SENT") {
      return {
        ...state,
        isLoading: true,
        showAlert: true,
        alertText: "Email Sent",
        alertType: "success",
      };
    }
    if (action.type === "CLEAR_VALUES") {
      return {
        ...state,
        isEditing: false,
        isLoading: false,
        setEditId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        status: "pending",
        jobType: "internship",
      };
    }
    if (action.type === "HANDLE_CHANGE") {
      return {
        ...state,
        [action.payLoad.name]: action.payLoad.value,
      };
    }
    if (action.type === "LOGOUT_USER") {
      return {
        ...intialState,
        token: null,
        user: null,
        userLocation: "",
      };
    }
    if (action.type === "TOGGLE_SIDEBAR") {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
    if (action.type === "SHOW_ALERT") {
      return {
        ...state,
        showAlert: true,
        alertText: "Please Write All Values",
        alertType: "danger",
      };
    }
    if (action.type === "CLEAR_ALERT") {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
    if (action.type === "REGISTER_USER_BEGIN") {
      return {
        ...state,
        showAlert: true,
        alertText: "Register begin",
        alertType: "success",
        isLoading: true,
      };
    }
    if (action.type === "REGISTER_USER_SUCCESS") {
      return {
        ...state,
        showAlert: true,
        alertText: "Register success",
        alertType: "success",
        token: action.payLoad.token,
        user: action.payLoad.user,
        location: action.payLoad.location,
      };
    }
    if (action.type === "REGISTER_USER_ERROR") {
      return {
        ...state,
        showAlert: true,
        alertText: action.msg,
        alertType: "danger",
        isLoading: false,
      };
    }
    if (action.type === "LOGIN_USER_BEGIN") {
      return {
        ...state,
        showAlert: true,
        alertText: "login begin",
        alertType: "success",
        isLoading: true,
      };
    }
    if (action.type === "LOGIN_USER_SUCCESS") {
      return {
        ...state,
        showAlert: true,
        alertText: "Login success",
        alertType: "success",
        isLoading: false,
        token: action.payLoad.token,
        user: action.payLoad.user,
        location: action.payLoad.location,
      };
    }
    if (action.type === "LOGIN_USER_ERROR") {
      return {
        ...state,
        showAlert: true,
        alertText: action.msg,
        alertType: "danger",
        isLoading: false,
      };
    }
    if (action.type === "UPDATE_USER_BEGIN") {
      return {
        ...state,
        showAlert: true,
        alertText: "Update begin",
        alertType: "success",
        isLoading: true,
      };
    }
    if (action.type === "UPDATE_USER_SUCCESS") {
      return {
        ...state,
        showAlert: true,
        alertText: "Update success",
        alertType: "success",
        isLoading: false,
        token: action.payLoad.token,
        user: action.payLoad.user,
        location: action.payLoad.location,
      };
    }
    if (action.type === "UPDATE_USER_ERROR") {
      return {
        ...state,
        showAlert: true,
        alertText: action.msg,
        alertType: "danger",
        isLoading: false,
      };
    }
    if (action.type === "CREATE_JOB_BEGIN") {
      return {
        ...state,
        isLoading: true,
      };
    }
    if (action.type === "CREATE_JOB_SUCCESS") {
      return {
        ...state,
        showAlert: true,
        alertText: "JOB CREATED",
        alertType: "success",
        isLoading: true,
      };
    }
    if (action.type === "CREATE_JOB_ERROR") {
      return {
        ...state,
        showAlert: true,
        alertText: action.msg,
        alertType: "danger",
        isLoading: true,
      };
    }
    if (action.type === "GET_JOBS_BEGIN") {
      return {
        ...state,
        isLoading: true,
      };
    }
    if (action.type === "GET_JOBS_SUCCESS") {
      return {
        ...state,
        isLoading: false,
        jobs: action.payLoad.jobs,
        totalJobs: action.payLoad.totalJob,
        numOfPages: action.payLoad.numOfPages,
      };
    }
    if (action.type === "SET_EDIT_JOB") {
      const job = state.jobs.find((job) => job._id === action.payLoad);
      const { position, company, _id, status, jobType, jobLocation } = job;
      return {
        ...state,
        isEditing: true,
        setEditId: _id,
        position,
        company,
        status,
        jobType,
        jobLocation,
      };
    }
    if (action.type === "EDIT_JOB_BEGIN") {
      return {
        ...state,
        isLoading: true,
      };
    }
    if (action.type === "EDIT_JOB_SUCCESS") {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: "Job edit Done",
        alertType: "success",
      };
    }
    if (action.type === "EDIT_JOB_ERROR") {
      return {
        ...state,
        showAlert: true,
        alertText: action.msg,
        alertType: "danger",
        isLoading: true,
      };
    }
    if (action.type === "DELETE_JOB_BEGIN") {
      return {
        ...state,
        isLoading: true,
      };
    }
    if (action.type === "SHOW_STAT_BEGIN") {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    if (action.type === "SHOW_STAT_SUCCESS") {
      return {
        ...state,
        isLoading: false,
        stats: action.payLoad.stats,
        monthlyStats: action.payLoad.monthlyStats,
      };
    }
    if (action.type === "PAGE_CHANGE_BEGIN") {
      return {
        ...state,
        isLoading: true,
        page: action.payLoad.currentPageNo,
      };
    }

    throw new Error("No such aciton found : " + action.type);
  }
  const [state, dispatch] = useReducer(reducer, intialState);

  const autoFetcher = axios.create({
    baseURL: "api/v1",
  });
  autoFetcher.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  autoFetcher.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status !== 401) {
        logoutUser();
      }
    }
  );

  async function allJobs() {
    try {
      dispatch({ type: GET_JOBS_BEGIN });
      const { search, typeJob, typeStatus, sort, page } = state;
      let url = `/job?status=${typeStatus}&jobType=${typeJob}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }

      const { data } = await autoFetcher.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const { jobs, totalJob, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payLoad: { jobs, totalJob, numOfPages },
      });
    } catch (err) {
      logoutUser();
    }
  }
  function displayAlert() {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }
  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT" });
    }, 3000);
  }

  function toggleSidebar() {
    dispatch({ type: TOGGLE_SIDEBAR });
  }

  function addUserToLocalStorage(user, token, userLocation) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("userLocation", userLocation);
  }
  function removeUserFromLocalStorage() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userLocation");
  }
  const registerUser = async (user) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", user);
      const data = await response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payLoad: {
          token: data.token,
          user: data.user,
          location: data.location,
        },
      });

      addUserToLocalStorage(data.user, data.token, data.location);
      clearAlert();
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, msg: error.response.data.Error });

      clearAlert();
    }
  };
  function logoutUser() {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  }
  const loginUser = async (loginUser) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const { data } = await axios.post("/api/v1/auth/login", loginUser);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payLoad: {
          user,
          token,
          location,
        },
      });

      addUserToLocalStorage(user, token, location);
      clearAlert();
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, msg: error.response.data.Error });
      clearAlert();
    }
  };
  async function updateUser(currentUser) {
    try {
      dispatch({ type: UPDATE_USER_BEGIN });

      const { data } = await autoFetcher.patch("/auth/update", currentUser, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payLoad: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage(user, token, location);
      clearAlert();
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        msg: error.response.data.Error,
      });
      clearAlert();
    }
  }
  async function createJob() {
    try {
      dispatch({ type: CREATE_JOB_BEGIN });
      const { position, company, status, jobType, jobLocation } = state;
      await autoFetcher.post(
        "/job",
        {
          position,
          company,
          status,
          jobType,
          jobLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: CREATE_JOB_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR, msg: error.response.data.Error });
      clearAlert();
    }
  }
  async function handleJobChange(name, value) {
    dispatch({
      type: HANDLE_CHANGE,
      payLoad: {
        name,
        value,
      },
    });
  }
  function clearValues() {
    dispatch({ type: CLEAR_VALUES });
  }
  function setEditbtn(id) {
    dispatch({ type: SET_EDIT_JOB, payLoad: id });
  }
  async function editJob() {
    dispatch({ type: EDIT_JOB_BEGIN });
    const { company, position, status, jobLocation, jobType, setEditId } =
      state;
    try {
      await autoFetcher.patch(
        `/job/${setEditId}`,
        {
          company,
          position,
          status,
          jobLocation,
          jobType,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: EDIT_JOB_SUCCESS });
      clearAlert();
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR, msg: error.response.data.Error });
      clearAlert();
    }
  }
  async function setDeletebtn(id) {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await autoFetcher.delete(`/job/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      allJobs();
    } catch (err) {
      logoutUser();
    }
  }
  async function showStats() {
    try {
      dispatch({ type: SHOW_STAT_BEGIN });
      const { data } = await autoFetcher("/job/stats", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      dispatch({
        type: SHOW_STAT_SUCCESS,
        payLoad: {
          stats: data.defaultStats,
          monthlyStats: data.monthlyStats,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  }

  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS });
  }
  function pageChange(currentPageNo) {
    dispatch({ type: PAGE_CHANGE_BEGIN, payLoad: { currentPageNo } });
  }
  async function resetMail(user) {
    try {
      const { email } = user;
      await autoFetcher.post("/auth/forget-password", { email });
      dispatch({ type: PASS_RESET_SENT });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        msg: error.response.data.Error,
      });
    }
  }
  async function resetPasswordAuth(user) {
    try {
      const { token, id } = user;
      await axios.get(`/api/v1/auth/reset-password/${token}/${id}`);

      dispatch({ type: PASS_RESET_AUTH });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        msg: error.response.data.Error,
      });
    }
  }
  async function resetPasswordSuccess(user) {
    try {
      const { password, id, token } = user;
      const { data } = await axios.patch(
        `/api/v1/auth/reset-password-success/${id}`,
        {
          password,
        }
      );
      dispatch({
        type: PASS_RESET_SUCCESS,
        payLoad: {
          user: data.user,
          location: data.location,
          token,
        },
      });
      addUserToLocalStorage(data.user, token, data.location);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        msg: error.response.data.Error,
      });
    }
  }

  return (
    <appContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleJobChange,
        clearValues,
        createJob,
        allJobs,
        setDeletebtn,
        setEditbtn,
        editJob,
        showStats,
        clearFilters,
        pageChange,
        resetMail,
        resetPasswordAuth,
        resetPasswordSuccess,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

function useAppContext() {
  return useContext(appContext);
}

export { AppProvider, useAppContext };
