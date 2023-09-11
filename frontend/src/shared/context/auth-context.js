import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isEmployeur: false,
  isCordonnateur: false,
  isEtudiant: false,
  login: () => {},
  logout: () => {},
  modification: () => {},
});
