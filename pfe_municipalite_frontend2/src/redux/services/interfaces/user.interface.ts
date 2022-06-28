export interface User {
  id: string;
  cin: Number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  employeeType: {
    type_id: string;
    role: string;
  };
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  role: string;
  password: string;
}

export interface PageMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export interface EmployeeInterface {
  data: User[];
  meta: PageMetaDto;
}

export interface RolePayload {
  role: string;
}

export interface GestionnaireParcPayload {
  employee: {
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    num_telephone: Number;
    email: string;
    password: string;
    role: string;
  };
  gestionnaire: {
    gestionnaire_id: string;
    employee_id: string;
  };
}

export interface MecanicienPayLoad {
  employee: {
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    num_telephone: number;
    email: string;
    password: string;
    role: string;
  }
  mecanicien:{
    mecancien_id: string;
    employee_id: string;
  };
}

export interface ConducteurPayLoad {
  employee: {
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    num_telephone: number;
    email: string;
    password: string;
    role: string;
  }
  conducteur:{
    conducteur_id: string;
    employee_id: string;
    num_permis_conduire: Number;
  };
}

export interface RoleInterface {
  type_id: string;
  role: string;
}
