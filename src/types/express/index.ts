declare namespace Express {
  export interface Request {
    user?: any; // Aqui você pode especificar o tipo de dados que está no token JWT
  }
}
