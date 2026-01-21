import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem"; 
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config)=>{
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;

}, (error)=>{
    return Promise.reject (error);
});

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
   try {
        const response = await githubApi.get(`/user/repos`, {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
            }
        });
        const repositories: RepositoryItem[] = response.data.map((repo:any) => ({
            name: repo.name,
            description: repo.description ? repo.description : null,
            //imageUrl: repo.owner ? repo.owner.avatar_url : null,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language ? repo.language : null, 
            full_name: repo.full_name
        }));

        return repositories;

   }catch (error) {
        console.error("Hubo un error al obtener repositorios", error);
        return[];
   }

}

 export const createRepository = async (repo: RepositoryItem) : Promise<void> => {
    
        try {
            const response = await githubApi.post (`/user/repos`, repo);
                console.log ("Repositorio ingresado", response.data);
            }
            catch (error) {
                console.error ("Error al crear repositorio", error);
            }
    };

export const getUserInfo = async (): Promise<UserInfo | null > => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data as UserInfo;
    } catch (error) {
        console.error("Error al obtener información del usuario", error);
        const userNotFound : UserInfo = {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se pudo obtener la información del usuario.',
            avatar_url: 'https://img.icons8.com/m_rounded/1200/user-not-found.jpg'
        }
        return userNotFound;
    }
};

/* Editar un repositorio existente */
export const updateRepository = async (
    owner: string,
    repoName: string,
    updatedData: Partial<RepositoryItem>
): Promise<boolean> => {
    try {
        await githubApi.patch(`/repos/${owner}/${repoName}`, updatedData);
        return true;
    } catch (error) {
        console.error("Error al actualizar el repositorio", error);
        return false;
    }
};

/* Eliminar un repositorio */
export const deleteRepository = async (
    owner: string,
    repoName: string
): Promise<boolean> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el repositorio", error);
        return false;
    }
};

/* Estado de carga genérico */
export interface ApiState<T> {
    loading: boolean;
    data: T | null;
    error: string | null;
}