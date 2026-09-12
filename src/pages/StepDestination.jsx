import React from "react";
import { MapPin } from "lucide-react";

// Tela final — Paciente chegou ao destino
// O botão "Entendi" reseta o ciclo e avança para o próximo CPF

export function StepDestination({ patient, onUnderstood }) {
  return (
    <main className="center destinationScreen">
      <div className="destinationIcon">
        <MapPin />
      </div>

      <h2>Você chegou ao seu destino!</h2>

      <p>
        {patient.name.split(" ")[0]}, seu atendimento é em{" "}
        <strong>{patient.room}</strong>.
      </p>

      <div className="destinationCard">
        <div className="destinationDetail">
          <small>LOCAL</small>
          <span>{patient.local}</span>
        </div>
        <div className="destinationDetail">
          <small>ANDAR</small>
          <span>{patient.floor}</span>
        </div>
        <div className="destinationDetail">
          <small>SALA</small>
          <span>{patient.room}</span>
        </div>
        <div className="destinationDetail">
          <small>HORÁRIO</small>
          <span>{patient.time}</span>
        </div>
      </div>

      <p className="destinationMsg">
        Apresente seu token <strong>{patient.token}</strong> na recepção do setor.
      </p>

      <button className="primary wide" onClick={onUnderstood}>
        Entendi
      </button>
    </main>
  );
}
