import { BASE_URL } from "./config";

// Make the searchPokemon function generic
export const searchPokemon = async <T>(query: string): Promise<T | Error> => {
  try {
    const response = await fetch(BASE_URL + `/pokemon/${query}/`);
    const body = await response.json();
    return body as T;
  } catch (error) {
    return error as Error;
  }
};
