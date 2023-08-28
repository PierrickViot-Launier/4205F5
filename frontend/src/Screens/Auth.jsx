import React, { useState, useContext } from "react";
import Button from "../Components/Form/Button";
import Input from "../Components/Form/Input";
import Card from "../shared/Card";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import "../shared/Card.css";
import { useHttpClient } from "../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from "../shared/context/auth-context";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest } = useHttpClient();
  const [profil, setProfil] = useState("");
  const [open, setOpen] = useState(false);
  let messageErreur;

  function checkboxEtudiantHandler(event) {
    if (event.target.checked) {
      auth.isEtudiant = true;
      auth.isEmployeur = false;
      document.getElementById("inputsEtudiant").style.display = "block";
    } else {
      auth.isEtudiant = false;
      auth.isEmployeur = true;
      document.getElementById("inputsEtudiant").style.display = "none";
    }
  }

  function profilHandler(event) {
    setProfil(event.target.value);
  }

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const reponseData = await sendRequest(
          "http://localhost:5000/api/utilisateurs/connexion",
          "POST",
          JSON.stringify({
            courriel: formState.inputs.email.value,
            motDePasse: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        switch (reponseData.typeUtilisateur) {
          case "etudiant":
            auth.isEtudiant = true;
            auth.profile = reponseData.utilisateur.profil;
            break;
          case "employeur":
            auth.isEmployeur = true;
            break;
          case "cordonnateur":
            auth.isCordonnateur = true;
            break;
          default:
            auth.isEtudiant = false;
            auth.isEmployeur = false;
            auth.isCordonnateur = false;
        }
        auth.login(
          reponseData.utilisateur._id,
          auth.isEtudiant,
          auth.isEmployeur,
          auth.profile
        );

        navigate("/");
      } catch (err) {
        // console.log(err);

        messageErreur = err.message;

        console.log(messageErreur);

        setOpen(true);
      }
    } else {
      try {
        if (auth.isEmployeur) {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/employeurs/inscription",
            "POST",
            JSON.stringify({
              nom: formState.inputs.name.value,
              courriel: formState.inputs.email.value,
              motDePasse: formState.inputs.password.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(reponseData);
          auth.login(reponseData.employeur.id, auth.isEtudiant, profil);
          navigate("/");
        } else {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/etudiants/inscription",
            "POST",
            JSON.stringify({
              DA: formState.inputs.DA.value,
              nom: formState.inputs.name.value,
              courriel: formState.inputs.email.value,
              motDePasse: formState.inputs.password.value,
              profil: profil,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(reponseData);
          auth.login(reponseData.etudiant.id, auth.isEtudiant, profil);
          navigate("/");
        }
      } catch (err) {
        // console.log(err);

        messageErreur = err;

        setOpen(true);
      }
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <Card className="authentication">
        {isLoginMode ? <h2>Connexion</h2> : <h2>Inscription</h2>}

        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Votre nom"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Veuillez entrer votre nom."
              onInput={inputHandler}
            />
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="Courriel"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Entrez un courriel valide."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Mot de passe"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Entrez un mot de passe valide, au moins 5 caractères."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <React.Fragment>
              <div className="flex justify-center mb-4 text-center">
                <input
                  id="checkboxEtudiant"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  onChange={checkboxEtudiantHandler}
                />
                <label
                  htmlFor="checkboxEtudiant"
                  className="ml-2 font-bold text-gray-900"
                >
                  Compte étudiant
                </label>
              </div>
              <div id="inputsEtudiant" className="hidden">
                <Input
                  element="input"
                  id="DA"
                  type="text"
                  label="Numéro DA"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(7)]}
                  errorText="Veuillez entrer votre numéro DA."
                  onInput={inputHandler}
                />

                <select
                  value={profil}
                  className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  name="profils"
                  id="profils"
                  onChange={profilHandler}
                >
                  <option value="">Sélectionnez un profil</option>
                  <option value="Réseaux et sécurité">
                    Réseaux et sécurité
                  </option>
                  <option value="Développement d'applications">
                    Développement d'applications
                  </option>
                </select>
              </div>
            </React.Fragment>
          )}
          {isLoginMode ? (
            <Button type="submit" disabled={!formState.isValid}>
              Connexion
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!formState.isValid || profil === ""}
            >
              Inscription
            </Button>
          )}
        </form>
        <Button inverse onClick={switchModeHandler}>
          Changer pour {isLoginMode ? "Inscription" : "Connexion"}
        </Button>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Erreur lors de la connexion"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"Courriel ou mot de passe invalide"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
