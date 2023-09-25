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

export default function ModifierProfilScreen() {
    const { error, sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);
    

    // object qui contient les données de l'utilisateur, que ce soit un étudiant, employeur, coordonateur, etc.
    const [donnees, setDonnees] = useState(null);


    if (!donnees) {
        (async () => {
            let url = "http://localhost:5000/api/utilisateurs/getProfileByUserID/" + auth.userId;
            
    
            let responseObj;
            try {
                responseObj = await sendRequest(url, "GET", undefined, {});
                setDonnees(responseObj.profile);

                
            }
            catch (err) {
    
            }
    
            // setDonnees(responseObj.etudiant);

            
    
        })();
    }


    const [formState, inputHandler, setFormData] = useForm({

        },
        false
    );


    const formSubmitHandler = async (event) => {
        event.preventDefault();
        let url = "http://localhost:5000/api/utilisateurs/getProfileByUserID/" + auth.userId;

        let responseObj;
        try {
            responseObj = await sendRequest(url, "POST",
            JSON.stringify({

            }),
            {
                "Content-Type": "application/json"
            });
            setDonnees(responseObj.profile);

        }
        catch (err) {

        }


    }

    return (
        <div className="flex justify-center mt-8 mb-8 text-justify">
            <Card className="">
                <h2>Modification profil</h2>
                {
                    donnees
                    ?
                        (
                            <>
                                <form onSubmit={formSubmitHandler}>
                                    <Button type="submit" disabled={!formState.isValid}>
                                        Sauvegarder
                                    </Button>
                                    <Input
                                        element="input"
                                        id="email"
                                        type="email"
                                        label="Courriel"
                                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                                        errorText="Entrez un courriel valide."
                                        onInput={inputHandler}
                                    />

                                </form>




                                
                            </>
                        )
                    :
                        (
                            <>
                                loading
                            </>
                        )
                }

            </Card>
        </div>
    );
};


