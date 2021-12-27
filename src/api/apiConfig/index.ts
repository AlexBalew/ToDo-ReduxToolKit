import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: { 'API-KEY': 'ae005362-3cd1-4901-a9c5-790f2698eec1' },
};

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});
