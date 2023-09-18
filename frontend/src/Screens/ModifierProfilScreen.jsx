import React from "react";
import { useState } from "react";

import Card from "../shared/Card";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";

export default function ModifierProfilScreen() {
    const { sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);
    

    // object qui contient les données de l'utilisateur, que ce soit un étudiant, employeur, coordonateur, etc.
    const [donnees, setDonnees] = useState(null);


    if (!donnees) {
        (async () => {
            let url = "http://localhost:5000/api/";
            if (auth.isEtudiant) {
                url += "etudiants/" + auth.userId;
            }
            else if (auth.isEmployeur) {
                url += "employeurs/" + auth.userId;
            }
    
            let responseObj;
            try {
                responseObj = await sendRequest(url, "GET", undefined, {});
                setDonnees(responseObj.etudiant);
            }
            catch (err) {
    
            }
    
            if (auth.isEtudiant) {
                setDonnees(responseObj.etudiant);
            }
            else if (auth.isEmployeur) {
                
            }
    
    
        })();
    }





    function formSubmitHandler(event) {
        event.preventDefault();


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
                                asdf
                            </>
                        )
                    :
                        (
                            <>
                                loading
                            </>
                        )
                }
                <form method="POST" onSubmit={formSubmitHandler}>

                </form>

            </Card>
        </div>
    );
};


