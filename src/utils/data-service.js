import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
// const AUTH_TOKEN = window.localStorage.getItem('__auth_provider_OAuthToken__');
// axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

const getTeamData = (endpoint) => axios.get(`${API_BASE_URL}/${endpoint}`).then(res => res.data)

const getTeamDepthData = (endpoint, data) => axios.get(`${API_BASE_URL}/${endpoint}`)
// const getTeamDepthData = (endpoint, data) => axios.post(`${API_BASE_URL}/${endpoint}`,data)

const getPlayerDepthData = (endpoint, data) => axios.get(`${API_BASE_URL}/${endpoint}`).then(res => res.data)
// const getPlayerDepthData = (endpoint, data) => axios.post(`${API_BASE_URL}/${endpoint}`,data).then(res => res.data)

const getPlayers = (endpoint) => axios.get(`${API_BASE_URL}/${endpoint}`).then(res => res.data)

export { getTeamData, getTeamDepthData, getPlayers, getPlayerDepthData }