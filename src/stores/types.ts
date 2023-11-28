export type User = {
    email: string,
    first_name: string,
    last_name: string,
    cpf: string,
    url_image: string
}

export interface UserStore {
    user: User | null;
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    loading: boolean;
    account: Account | null;
    getUser: (token: string) => void;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string, firstName: string, lastName: string, cpf: string) => void;
    logout: () => void;
};

export interface AuthApiResponse {
    access: string;
    refresh: string;
}

export interface SignUpResponse {
    email: string,
    first_name: string,
    last_name: string,
    cpf: string,
    url_image: string
}

export interface Account {
    id: number,
    agencia: string,
    numero: string
}