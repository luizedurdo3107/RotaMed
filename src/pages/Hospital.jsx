import React, { useState, useEffect } from "react";
import {
  Bell,
  UserRound,
  Stethoscope,
  Clock3,
  Building2
} from "lucide-react";

import { HospitalHeader } from "../components/Header.jsx";
import {
  readState,
  writeState,
  callPatient,
  clearState,
  subscribeToState
} from "../services/syncState.js";
import PATIENTS from "../data/patients.js";

// Painel hospitalar — visão do funcionário do hospital
// Acessado exclusivamente via CPF secreto
export function Hospital() {
  const [state, setState] = useState(readState());

  // Sincroniza em tempo real com o totem
  useEffect(() => {
    const unsubscribe = subscribeToState((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  // Chama um paciente pelo token
  function handleCall(patient) {
    const newState = callPatient(patient.token);
    setState(newState);
  }

  // Limpa toda a simulação
  function handleClear() {
    clearState();
    setState(readState());
  }

  // Dados do paciente atualmente chamado
  const calledPatient = state.calledToken
    ? PATIENTS.find((p) => p.token === state.calledToken)
    : null;

  // Pacientes aguardando (sem o chamado)
  const waitingCount = state.arrivals.filter(
    (a) => state.calledToken !== a.token
  ).length;

  return (
    <div className="hospital">
      <HospitalHeader onClear={handleClear} />

      <main>
        <div className="hospitalTitle">
          <div>
            <div className="eyebrow">CENTRAL HOSPITALAR</div>
            <h1>Painel de Atendimento</h1>
            <p>Acompanhe chegadas e chame pacientes para o próximo destino.</p>
          </div>
          <div className="live">● AO VIVO</div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="stats">
          <StatCard
            icon={<UserRound />}
            label="Pacientes aguardando"
            value={waitingCount}
          />
          <StatCard
            icon={<Stethoscope />}
            label="Em atendimento"
            value={state.calledToken ? 1 : 0}
          />
          <StatCard
            icon={<Clock3 />}
            label="Próximos atendimentos"
            value="05"
          />
        </div>

        <div className="columns">
          {/* Lista de chegadas */}
          <section className="panel">
            <div className="panelTitle">
              <h2>Chegadas recentes</h2>
              <span>{state.arrivals.length} registradas</span>
            </div>

            {state.arrivals.length === 0 ? (
              <div className="empty">
                <Building2 />
                <b>Nenhuma chegada ainda</b>
                <p>Faça um check-in no totem para ver o paciente aqui.</p>
              </div>
            ) : (
              state.arrivals.map((arrival) => {
                const isCalling = state.calledToken === arrival.token;
                return (
                  <PatientRow
                    key={arrival.token}
                    patient={arrival}
                    isCalling={isCalling}
                    onCall={() => handleCall(arrival)}
                  />
                );
              })
            )}
          </section>

          {/* Painel lateral de notificações */}
          <aside className="panel notification">
            <div className="panelTitle">
              <h2>
                <Bell />
                Última atividade
              </h2>
            </div>

            {state.arrivals[0] ? (
              <div className="notify">
                <div className="notifyIcon">
                  <Bell />
                </div>
                <div>
                  <b>Nova chegada</b>
                  <h3>{state.arrivals[0].name} chegou para o atendimento.</h3>
                  <p>
                    <strong>{state.arrivals[0].token}</strong> ·{" "}
                    {state.arrivals[0].type}
                  </p>
                  <span>{state.arrivals[0].local}</span>
                </div>
              </div>
            ) : (
              <div className="empty">
                <Bell />
                <b>Aguardando novo paciente</b>
              </div>
            )}

            {/* Prévia da chamada ativa */}
            {calledPatient && (
              <div className="callPreview">
                <div className="eyebrow">CHAMADA ATIVA</div>
                <strong>{calledPatient.token}</strong>
                <h3>{calledPatient.name}</h3>
                <p>
                  Dirija-se ao <b>{calledPatient.room}</b>
                  <br />
                  {calledPatient.floor}
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

// Linha de paciente na lista do painel
function PatientRow({ patient, isCalling, onCall }) {
  return (
    <div className={`row ${isCalling ? "calling" : ""}`}>
      <div className="tokenSmall">{patient.token}</div>
      <div>
        <b>{patient.name}</b>
        <span>{patient.type}</span>
      </div>
      <div>
        <small>HORÁRIO</small>
        {patient.time}
      </div>
      <div>
        <small>DESTINO</small>
        {patient.local}
      </div>
      <div>
        <span className="status">
          {isCalling ? "Chamando" : "Aguardando"}
        </span>
        <button
          className="call"
          disabled={isCalling}
          onClick={onCall}
        >
          {isCalling ? "Paciente chamado" : "Chamar paciente"}
        </button>
      </div>
    </div>
  );
}

// Card de estatística
function StatCard({ icon, label, value }) {
  return (
    <div className="stat">
      <div className="statIcon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
