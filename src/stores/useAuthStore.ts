import api from "../services/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Toast from "react-native-toast-message";
import localforage from "localforage";

type User = {
    email: string,
    first_name: string,
    last_name: string,
    cpf: string,
    url_image: string
}

interface UserStore {
    user: User | null;
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    account: Account | null;
    getUser: (token: string) => void;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string, firstName: string, lastName: string, cpf: string) => void;
    logout: () => void;
};

interface AuthApiResponse {
    access: string;
    refresh: string;
}

interface SignUpResponse {
    email: string,
    first_name: string,
    last_name: string,
    cpf: string,
    url_image: string
}

interface Account {
    id: number,
    agencia: string,
    numero: string
}

const useAuthStore = create(
    persist<UserStore>(
        (set) => ({
            user: null,
            accessToken: '',
            refreshToken: '',
            account: null,
            isAuthenticated: false,
            signIn: async (email: string, password: string) => {
                await api.post<AuthApiResponse>("/token/", {
                    email,
                    password
                }).then((resp) => {
                    console.log(resp.data)
                    set((state) => ({
                        accessToken: resp.data.access,
                        refreshToken: resp.data.refresh,
                        isAuthenticated: true
                    }));
                    Toast.show({
                        type: 'success',
                        text1: 'Seja bem-vindo(a)',
                    });
                }).catch((error) => {
                    if (error.response.status == 401 || error.response.status == 500) {
                        if (error.response.data.detail) {
                            Toast.show({
                                type: 'error',
                                text1: `${error.response.data.detail}`,
                            });
                        }
                        else {
                            Toast.show({
                                type: 'error',
                                text1: 'Dados incorretos',
                            });
                        }
                    }
                })
            },
            getUser: async (token: string) => {

                await api.get<User>("/user/me/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(async (resp) => {
                    if (resp.status == 200) {
                        set((state) => ({
                            user: resp.data
                        }))
                        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        await api.get<Account[]>("/v1/accounts/").then(async (resp) => {
                            if (resp.data.length < 1) {
                                await api.post("/v1/accounts/").then(async (response) => {
                                    if (response.data.message == "created") {
                                        // toast.info("Uma nova conta acaba de ser criada")
                                        await api.get<Account[]>("/v1/accounts/").then(accounts => {
                                            set((state) => ({
                                                account: accounts.data[0]
                                            }))
                                        })
                                    }
                                })
                            } else {
                                set((state) => ({
                                    account: resp.data[0]
                                }))
                            }
                        }).catch(err => { })
                    }
                }).catch(erro => {
                    if (erro.response.status === 401) {
                        set((state) => ({
                            accessToken: '',
                            refreshToken: '',
                            user: null,
                            isAuthenticated: false,
                        }))
                        // Router.push("/login")
                        Toast.show({
                            type: 'error',
                            text1: 'Sessão expirada!',
                        });
                    }
                })
            },
            logout: () => {
                set((state) => ({
                    accessToken: '',
                    refreshToken: '',
                    user: null,
                    isAuthenticated: false,
                }))
            },
            signUp: async (email: string, password: string, firstName: string, lastName: string, cpf: string) => {

                await api.post<SignUpResponse>("/user/create/", {
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    cpf
                }).then((resp) => {
                    Toast.show({
                        type: 'success',
                        text1: "Cadastro realizado!",
                    });
                }).catch((error) => {
                    const resp = error.response
                    if (error.code == "ERR_BAD_REQUEST") {
                        for (const field in resp.data) {
                            Toast.show({
                                type: 'error',
                                text1: field,
                                text2: resp.data[field],
                            });
                        }
                    }
                })
            },
        }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localforage as never),
    }
    ));

export default useAuthStore;