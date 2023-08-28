import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  isEmployeur: false,
  isCordonnateur: false,
  isEtudiant: false,
  profile: "",
  login: () => {},
  logout: () => {},
  modification: () => {},
});
