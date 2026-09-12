import React, { useState, useEffect } from "react";

import { TotemHeader } from "../components/Header.jsx";
import { StepIdentify } from "./StepIdentify.jsx";
import { StepPatient } from "./StepPatient.jsx";
import { StepToken } from "./StepToken.jsx";
import { StepRoute } from "./StepRoute.jsx";
import { StepDestination } from "./StepDestination.jsx";

import { validateCpf, formatCpf } from "../services/auth.js";
import { readState, checkInPatient, subscribeToState } from "../services/syncState.js";
import { getCurrentCpf, advanceCycle } from "../services/cycleManager.js";

// Passos do fluxo do totem
const STEP = {
  IDENTIFY: 1,    // CPF
  PATIENT: 2,     // Dados do paciente
  TOKEN: 3,       // Token + aguardar chamada
  ROUTE: 4,       // Mapa da rota
  DESTINATION: 5  // Tela de chegada + botão Entendi
};

export function Kiosk({ onGoToHospital }) {
  // Estado do fluxo do totem
  const [step, setStep] = useState(STEP.IDENTIFY);
  const [cpfInput, setCpfInput] = useState("");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [sharedState, setSharedState] = useState(readState());

  // CPF em exibição na tela inicial (rodízio)
  const [displayCpf, setDisplayCpf] = useState(() => getCurrentCpf());

  // Sincroniza estado compartilhado com painel hospitalar
  useEffect(() => {
    const unsubscribe = subscribeToState((newState) => {
      setSharedState(newState);
    });
    return unsubscribe;
  }, []);

  // Quando o hospital chama o paciente, avança para a etapa de chamada
  useEffect(() => {
    if (
      currentPatient &&
      sharedState.calledToken === currentPatient.token &&
      step === STEP.TOKEN
    ) {
      // O token foi chamado — o StepToken já mostra o botão "Ver minha rota"
      // Não avança automaticamente; o paciente clica no botão
    }
  }, [sharedState, currentPatient, step]);

  // Adiciona um dígito ao CPF
  function handleDigit(digit) {
    setCpfInput((prev) => formatCpf(prev + digit));
  }

  // Remove o último dígito
  function handleDelete() {
    setCpfInput((prev) => formatCpf(prev.replace(/\D/g, "").slice(0, -1)));
  }

  // Valida o CPF digitado e decide o fluxo
  function handleSubmit() {
    const result = validateCpf(cpfInput);

    if (result.type === "hospital") {
      // CPF secreto → abre painel hospitalar
      onGoToHospital();
      return;
    }

    if (result.type === "patient") {
      setCurrentPatient(result.patient);
      setStep(STEP.PATIENT);
      return;
    }

    if (result.type === "error") {
      alert(result.message);
    }
  }

  // Confirma chegada do paciente
  function handleConfirmArrival() {
    checkInPatient(currentPatient);
    setStep(STEP.TOKEN);
  }

  // Paciente vai ver a rota (após ser chamado)
  function handleViewRoute() {
    setStep(STEP.ROUTE);
  }

  // Paciente chegou ao destino
  function handleArrived() {
    setStep(STEP.DESTINATION);
  }

  // Paciente clicou em "Entendi" — reseta tudo e avança o ciclo
  function handleUnderstood() {
    // Avança para o próximo CPF no ciclo
    const nextCpf = advanceCycle();

    // Reseta todos os estados do totem
    setCurrentPatient(null);
    setCpfInput("");
    setStep(STEP.IDENTIFY);
    setDisplayCpf(nextCpf);
  }

  // Volta para tela inicial (botão Voltar)
  function handleBack() {
    setCpfInput("");
    setStep(STEP.IDENTIFY);
    setCurrentPatient(null);
  }

  // Verifica se o paciente atual foi chamado
  const isCalled = currentPatient
    ? sharedState.calledToken === currentPatient.token
    : false;

  // Renderiza o step correto
  return (
    <div>
      {step !== STEP.IDENTIFY && step !== STEP.DESTINATION && (
        <TotemHeader step={step} />
      )}

      {step === STEP.IDENTIFY && (
        <StepIdentify
          cpf={cpfInput}
          displayCpf={displayCpf}
          onDigit={handleDigit}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      )}

      {step === STEP.PATIENT && currentPatient && (
        <StepPatient
          patient={currentPatient}
          onBack={handleBack}
          onConfirm={handleConfirmArrival}
        />
      )}

      {step === STEP.TOKEN && currentPatient && (
        <StepToken
          patient={currentPatient}
          isCalled={isCalled}
          onViewRoute={handleViewRoute}
        />
      )}

      {step === STEP.ROUTE && currentPatient && (
        <StepRoute
          patient={currentPatient}
          onArrived={handleArrived}
        />
      )}

      {step === STEP.DESTINATION && currentPatient && (
        <StepDestination
          patient={currentPatient}
          onUnderstood={handleUnderstood}
        />
      )}
    </div>
  );
}
