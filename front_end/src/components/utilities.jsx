import axios from "axios";

export const userApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/user/",
  });

export const wildApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/pokemon/wild/",
});

export const pokeApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/pokemon/",
});

export const teamApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/team/",
});

export const pokedexApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/pokemon/pokedex/",
});