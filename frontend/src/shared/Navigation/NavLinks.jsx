import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

export default function NavLinks() {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <ul className="navLinks">
      <li>
        <NavLink to={"/"}>Accueil</NavLink>
      </li>

      <li>
        <NavLink to={"/FAQ"}>FAQ</NavLink>
      </li>

      {/* <li>
        <NavLink to={"/Profils"}>Profils et compétences</NavLink>
      </li> */}

      <li>
        <NavLink to={"/Deroulement"}>Déroulement du stage</NavLink>
      </li>

      {auth.isLoggedIn && auth.isEmployeur && (
        <li>
          <NavLink to={"/creerStage"}>Créer un stage</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (auth.isEmployeur || auth.isCordonnateur) && (
        <li>
          <NavLink to={"/gererOffres"}>Offres de stage</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isCordonnateur && (
        <li>
          <NavLink to={"/etudiants"}>Etudiants</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isEtudiant && (
        <li>
          <NavLink to={"/stagesDisponibles"}>Stages disponibles</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isEtudiant && (
        <li>
          <NavLink to={"/stagesPostules"}>Stages postulés</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={"/modifierProfil"}>Modifier le profil</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to={"/Connexion"}>Connexion</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button
            onClick={() => {
              auth.logout();

              navigate("/");
            }}
          >
            Déconnexion
          </button>
        </li>
      )}
    </ul>
  );
}
