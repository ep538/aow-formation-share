import React, { useCallback, useState } from "react";
import Header from "../Header";
import TroopSquares from "../TroopSquares";
import TroopSelectionForm from "../TroopSelectionForm";
import Footer from "../Footer";
import s from "./App.module.scss";

const App = () => {
  const [troopSelectionFormStatus, setTroopSelectionFormStatus] = useState(
    false
  );
  const [selectedSquare, setSelectedSquare] = useState();
  const [formation, setFormation] = useState({});

  const showTroopSelectionForm = useCallback((squareNum) => {
    setTroopSelectionFormStatus(true);
    setSelectedSquare(squareNum);
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFormation({
        ...formation,
        [e.target.square.value]: {
          troop: e.target.troop.value,
          level: e.target.level.value,
        },
      });
      setTroopSelectionFormStatus(false);
    },
    [formation]
  );

  return (
    <div className={s.app}>
      <Header />
      <div className={s.formationShare}>
        {troopSelectionFormStatus && (
          <TroopSelectionForm
            handleFormSubmit={handleFormSubmit}
            selectedSquare={selectedSquare}
            setTroopSelectionFormStatus={setTroopSelectionFormStatus}
          />
        )}
        <div className={s.formationBoard}>
          <TroopSquares
            formation={formation}
            showTroopSelectionForm={showTroopSelectionForm}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
