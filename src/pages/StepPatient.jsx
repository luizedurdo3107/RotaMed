import React from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList } from "lucide-react";
import { InfoRow } from "../components/InfoRow.jsx";

// Tela 2 — Detalhes do atendimento e confirmação de chegada
export function StepPatient({ patient, onBack, onConfirm }) {
  const firstName = patient.name.split(" ")[0];

  return (
    <main className="center">
      <div className="pill">
        <ClipboardList />
        Atendimento encontrado
      </div>

      <h2>Olá, {firstName}!</h2>
      <p>Encontramos seu atendimento.</p>

      <div className="card">
        <div className="cardHead">
          <ClipboardList />
          Detalhes do atendimento
        </div>
        <div className="grid">
          <InfoRow label="PACIENTE" value={patient.name} />
          <InfoRow label="ATENDIMENTO" value={patient.type} />
          <InfoRow label="PROFISSIONAL" value={patient.professional} />
          <InfoRow label="HORÁRIO" value={patient.time} />
          <InfoRow label="LOCAL" value={patient.local} />
          <InfoRow label="DATA" value="Hoje" />
        </div>
      </div>

      <div className="actions">
        <button className="secondary" onClick={onBack}>
          <ArrowLeft />
          Voltar
        </button>
        <button className="primary wide" onClick={onConfirm}>
          <Check />
          Confirmar chegada
        </button>
      </div>
    </main>
  );
}
