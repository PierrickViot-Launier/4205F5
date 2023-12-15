import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import AccueilScreen from "./Screens/AccueilScreen";
import DeroulementStagiaireScreen from "./Screens/DeroulementStagiaireScreen";
import FAQScreen from "./Screens/FAQScreen";
import FormulaireEmployeurScreen from "./Screens/FormulaireEmployeurScreen";
import ProfilsCompetencesScreen from "./Screens/ProfilsCompetencesScreen";
import MainNavigation from "./shared/Navigation/MainNavigation";
import StagesPostules from "./Components/stages/StagesPostules";
import Footer from "./shared/Footer";
import { useCallback, useState } from "react";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./Screens/Auth";
import StagesDisponibles from "./Components/stages/StagesDisponibles";
import OffresDeStage from "./Components/stages/OffresDeStage";
import Etudiants from "./Components/etudiants/Etudiants";
import ModifierProfilScreen from "./Screens/ModifierProfilScreen";
import DetailStage from "./Screens/DetailStage";
import VerifierAdress from "./Components/OpenMap/VerifierAdress";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEtudiant, setIsEtudiant] = useState(false);
  const [isEmployeur, setIsEmployeur] = useState(false);
  const [isCordonnateur, setIsCordonnateur] = useState(false);
  const [derniereModification, setDerniereModification] = useState(
    new Date().toLocaleString()
  );

  const login = useCallback((userId, isEtudiant, isEmployeur) => {
    setIsLoggedIn(true);
    setUserId(userId);

    if (isEtudiant) {
      setIsEtudiant(true);
      setIsEmployeur(false);
      setIsCordonnateur(false);
    } else if (isEmployeur) {
      setIsCordonnateur(false);
      setIsEtudiant(false);
      setIsEmployeur(true);
    } else {
      setIsCordonnateur(true);
      setIsEmployeur(false);
      setIsEtudiant(false);
    }
  }, []);

  const modification = useCallback((nouvelleDate) => {
    setDerniereModification(nouvelleDate);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setIsEmployeur(false);
    setIsEtudiant(false);
    setIsCordonnateur(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        isEmployeur: isEmployeur,
        isEtudiant: isEtudiant,
        isCordonnateur: isCordonnateur,
        login: login,
        logout: logout,
        modification: modification,
      }}
    >
      <div className="flex flex-col h-screen justify-between">
        <Router>
          <MainNavigation />
          <main>
            <Routes>
            
              <Route path="/" element={<AccueilScreen />} />
              <Route path="/FAQ" element={<FAQScreen />} />
              <Route path="/Profils" element={<ProfilsCompetencesScreen />} />
              
              <Route
                path="/Deroulement"
                element={<DeroulementStagiaireScreen />}
              />

              <Route
                path="/DetailStage/:stageId"
                element={<DetailStage />}
              />

              {isLoggedIn && isEmployeur && (
                <React.Fragment>
                  <Route
                    path="/creerStage"
                    element={<FormulaireEmployeurScreen />}
                  />
                  <Route path="/gererOffres" element={<OffresDeStage />} />
                </React.Fragment>
              )}
              {isLoggedIn && isCordonnateur && (
                <>
                  <Route path="/gererOffres" element={<OffresDeStage />} />
                  <Route path="/etudiants" element={<Etudiants />} />
                </>
              )}
              {isLoggedIn && isEtudiant && (
                <React.Fragment>
                  <Route
                    path="/stagesDisponibles"
                    element={<StagesDisponibles />}
                  />
                  <Route path="/stagesPostules" element={<StagesPostules />} />
                </React.Fragment>
              )}

              {!isLoggedIn && <Route path="/Connexion" element={<Auth />} />}

              <Route
                path="/modifierProfil"
                element={<ModifierProfilScreen />}
              />

              <Route
                path="/VerifierAdress"
                element={<VerifierAdress/>}
              />
            </Routes>
          </main>
        </Router>

        <Footer derniereModification={derniereModification} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;