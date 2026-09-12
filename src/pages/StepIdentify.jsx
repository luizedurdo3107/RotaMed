import React from "react";
import { ArrowRight } from "lucide-react";
import { Keypad } from "../components/Keypad.jsx";
import { formatCpf } from "../services/auth.js";

// Tela 1 — Identificação por CPF
// Exibe UM CPF de demonstração por vez (rodízio automático)
// O botão de acesso ao hospital foi removido — acesso apenas pelo CPF secreto

export function StepIdentify({ cpf, onDigit, onDelete, onSubmit, displayCpf }) {
  // Garante que o campo de CPF mostre o placeholder quando vazio
  const displayValue = cpf || "000.000.000-00";

  return (
    <main className="identify">
      <section>
        <div className="eyebrow">BEM-VINDO</div>

        <h1>
          Olá!
          <br />
          <b>Identifique-se</b>
        </h1>

        <p>
          Digite seu CPF para consultar
          <br />
          seu atendimento.
        </p>

        <label>CPF</label>
        <div className="input">{displayValue}</div>

        <div className="demo">
          Use o CPF preparado para esta simulação
          <br />
          <strong className="demoCpf">
            CPF da simulação:
            <br />
            <span>{displayCpf}</span>
          </strong>
        </div>

        <button className="primary" onClick={onSubmit}>
          Continuar <ArrowRight />
        </button>
      </section>

      <Keypad
        onAdd={(digit) => onDigit(digit)}
        onDelete={onDelete}
      />
    </main>
  );
}
