import React, { useState, useEffect } from "react";
import { Navigation } from "lucide-react";

// Passos exibidos no header do totem
const STEPS = ["Identificação", "Atendimento", "Sua Rota", "Destino"];

// Header do Totem com indicador de progresso
export function TotemHeader({ step }) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="brand">
        <div className="logo">
          <Navigation />
        </div>
        Rota<span>Med</span>
      </div>

      <div className="steps">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isDone = step > stepNumber;
          return (
            <React.Fragment key={label}>
              <div className={`step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
                <b>0{stepNumber}</b>
                {label}
              </div>
              {index < STEPS.length - 1 && <i />}
            </React.Fragment>
          );
        })}
      </div>

      <time>{time}</time>
    </header>
  );
}

// Header do Painel Hospitalar
export function HospitalHeader({ onClear }) {
  return (
    <header className="hospitalHeader">
      <div className="brand">
        <div className="logo">
          <Navigation />
        </div>
        Rota<span>Med</span>
      </div>

      <div className="hospitalName">
        <b>Painel de Atendimento</b>
        <small>Monitoramento em tempo real</small>
      </div>

      <button onClick={onClear}>
        <span>↺</span> Limpar simulação
      </button>
    </header>
  );
}
