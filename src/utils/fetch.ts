import { Article } from "../types/Article";
import { client } from "./fetchClient";

const API_KEY = '90e15e75d18b44109c7c33cf375ead2e';

export const fetchArticle = async (query: string, page: number): Promise<Article[]> => {
    try {
        const url = `?q=${query}&pageSize=10&page=${page}&apiKey=${API_KEY}`;

        return await client.get(url);
    } catch {
        throw new Error('error')
    }
};
