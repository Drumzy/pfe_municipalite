export interface PayloadInterface{
    email: string;
    password: string;
    role: string;
}

export interface JwtPayload{
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: string;
    email: string;
    password: string;
    role: string;
}

export interface RolePayload{
    role: string;
}