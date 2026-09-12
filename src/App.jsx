import React, { useState } from "react";
import { Kiosk } from "./pages/Kiosk.jsx";
import { Hospital } from "./pages/Hospital.jsx";

// Componente raiz da aplicação RotaMed
// Gerencia a alternância entre o Totem do paciente e o Painel Hospitalar
// O Painel Hospitalar é acessado EXCLUSIVAMENTE via CPF secreto no Totem

export function App() {
  // false = Totem, true = Painel Hospitalar
  const [showHospital, setShowHospital] = useState(false);

  if (showHospital) {
    return <Hospital />;
  }

  return (
    <Kiosk
      onGoToHospital={() => setShowHospital(true)}
    />
  );
}
