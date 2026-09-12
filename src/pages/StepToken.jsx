import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

// Tela 3 — Token e aguardando chamada do hospital
export function StepToken({ patient, isCalled, onViewRoute }) {
  return (
    <main className="center">
      <div className="success">
        <span>✓</span>
      </div>

      <h2>Chegada confirmada!</h2>
      <p>Seu atendimento foi registrado.</p>

      <div className="token">
        <header>SEU TOKEN</header>
        <strong>{patient.token}</strong>
        <div className="tokenMeta">
          <span>
            <small>ATENDIMENTO</small>
            {patient.type}
          </span>
          <span>
            <small>HORÁRIO</small>
            {patient.time}
          </span>
          <span>
            <small>LOCAL</small>
            {patient.local}
          </span>
        </div>
      </div>

      {isCalled ? (
        // Hospital chamou — destaque verde com botão principal
        <div className="calledBanner">
          <strong>{patient.name.split(" ")[0]}, é a sua vez!</strong>
          <p>O hospital está te chamando. Siga para o atendimento.</p>
          <button className="primary wide" onClick={onViewRoute}>
            <MapPin />
            Ver minha rota
            <ArrowRight />
          </button>
        </div>
      ) : (
        // Ainda aguardando — mostra aviso e botão secundário
        <div className="waitingBanner">
          <p>Aguarde — você será chamado em breve.</p>
          <button className="btnVerRota" onClick={onViewRoute}>
            <MapPin />
            Ver rota até o destino
            <ArrowRight />
          </button>
        </div>
      )}
    </main>
  );
}
