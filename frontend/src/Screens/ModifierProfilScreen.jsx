import React from "react";
import { useState } from "react";

import Card from "../shared/Card";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";

import Input from "../Components/Form/Input";
import Button from "../Components/Form/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { config } from "../config";

import PdfUpload from "../Components/Form/PdfUpload";
import FileUploader from "../Components/Form/FileUploader";
import UploadedFilePreview from "../Components/Form/UploadedFilePreview";

export default function ModifierProfilScreen() {
  const [selectedFile, setSelectedFile] = useState("");
  const [attachements, setAttachements] = useState([]);

  const { error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

  // object qui contient les données de l'utilisateur, que ce soit un étudiant, employeur, coordonateur, etc.
  const [donnees, setDonnees] = useState(null);

  // console.log(auth);
  console.log(donnees);

  const [formState, inputHandler, setFormData] = useForm(
    {
      courriel: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  if (!donnees) {
    (async () => {
      let url =
        config.backend + "/api/utilisateurs/getProfileByUserID/" + auth.userId;

      let responseObj;
      try {
        responseObj = await sendRequest(url, "GET", undefined, {});
        setDonnees(responseObj.profile);
      } catch (err) {}
    })();
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let url =
      config.backend + "/api/utilisateurs/setProfileByUserID/" + auth.userId;

    let data = {
      nom: formState.inputs.nom.value,
      courriel: formState.inputs.courriel.value,
    };

    if (auth.isEtudiant) {
      data.DA = formState.inputs.DA.value;
      data.adresse = formState.inputs.adresse.value;
      data.telephone = formState.inputs.telephone.value;
      // if (attachement !== "") {
      //   data.attachement = attachement;
      // }
      data.attachements = donnees.attachements;
    } else if (auth.isEmployeur) {
      data.adresse = formState.inputs.adresse.value;
      data.telephone = formState.inputs.telephone.value;
      data.nomEntreprise = formState.inputs.nomEntreprise.value;
      data.poste = formState.inputs.poste.value;
    }

    // console.log(auth);
    // console.log(formState);

    let responseObj;
    try {
      responseObj = await sendRequest(url, "POST", JSON.stringify(data), {
        "Content-Type": "application/json",
      });
      // setDonnees(responseObj.profile);
    } catch (err) {}
  };

  return (
    <div className="flex justify-center mt-8 mb-8 text-justify">
      <Card className="">
        <h2>Modification profil</h2>
        {donnees ? (
          <>
            <form onSubmit={formSubmitHandler}>
              <Button type="submit" disabled={!formState.isValid}>
                Sauvegarder
              </Button>
              <Input
                element="input"
                id="nom"
                type="text"
                label="Votre nom"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide."
                initialValue={donnees.nom}
                initialValid={true}
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="courriel"
                type="email"
                label="Courriel"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide."
                initialValue={donnees.courriel}
                initialValid={true}
                onInput={inputHandler}
              />
              {[
                auth.isEtudiant && [
                  <>
                    <Input
                      element="input"
                      id="DA"
                      type="text"
                      label="Votre numéro de DA"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Entrez un numéro de DA valide."
                      initialValue={donnees.DA}
                      initialValid={true}
                      onInput={inputHandler}
                    />
                    {donnees.attachements
                    && (
                      <div>
                        {donnees.attachements.map((url, index) => (
                          <>
                            <UploadedFilePreview
                              onRemoveClicked={() => {
                                const dup = {...donnees};
                                const attachements = [...donnees.attachements];
                                attachements.splice(index, 1);
                                dup.attachements = attachements;
                                setDonnees(dup);

                              }}
                              url={url}
                            />
                            {/* <a href="asdf" style={{display: "block"}}>{url}</a> */}
                          </>
                        ))}
                      </div>
                    )}
                    {donnees.attachements?.length < 3
                    && (
                      // <PdfUpload
                      //   selectedFile={selectedFile}
                      //   setSelectedFile={setSelectedFile}
                      //   setAttachements={setAttachements}
                      // />
                      // <div>
                      //   pdf uploader
                      // </div>
                      <FileUploader
                        onFileUploaded={(url) => {
                          const dup = {...donnees};
                          dup.attachements = [...donnees.attachements, url];
                          setDonnees(dup);

                        }}
                      />
                    )}
                  </>,
                ],
                (auth.isEtudiant || auth.isEmployeur) && [
                  <Input
                    element="input"
                    id="adresse"
                    type="text"
                    label="Votre adresse"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez une adresse valide."
                    initialValue={donnees.adresse}
                    initialValid={true}
                    onInput={inputHandler}
                  />,
                  <Input
                    element="input"
                    id="telephone"
                    type="text"
                    label="Votre numéro de téléphone"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez un numéro de téléphone valide."
                    initialValue={donnees.telephone}
                    initialValid={true}
                    onInput={inputHandler}
                  />,
                ],
                auth.isEmployeur && [
                  <Input
                    element="input"
                    id="poste"
                    type="text"
                    label="Votre numéro de poste"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez un numéro de poste valide."
                    initialValue={donnees.poste}
                    initialValid={true}
                    onInput={inputHandler}
                  />,
                  <Input
                    element="input"
                    id="nomEntreprise"
                    type="text"
                    label="Votre nom d'entreprise"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Entrez un nom d'entreprise valide."
                    initialValue={donnees.nomEntreprise}
                    initialValid={true}
                    onInput={inputHandler}
                  />,
                ],
              ]}
            </form>
          </>
        ) : (
          <>loading</>
        )}
      </Card>
    </div>
  );
}
