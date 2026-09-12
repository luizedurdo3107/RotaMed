import React from "react";
import { MapPin, Clock3, Check } from "lucide-react";

// Tela 4 — Mapa e rota até o destino
export function StepRoute({ patient, onArrived }) {
  const destination = patient.room || patient.local;

  return (
    <main className="route">
      <section className="routeInfo">
        <div className="eyebrow">SUA ROTA</div>
        <h2>Como chegar</h2>
        <p>
          {patient.name.split(" ")[0]}, siga esta rota até seu atendimento.
        </p>

        <div className="routeCard">
          <div>
            <MapPin />
            <span>
              <small>VOCÊ ESTÁ AQUI</small>
              Recepção — Térreo
            </span>
          </div>
          <hr />
          <div>
            <Check />
            <span>
              <small>DESTINO FINAL</small>
              {destination}
            </span>
          </div>
        </div>

        <div className="eta">
          <Clock3 />
          <span>
            <small>TEMPO ESTIMADO</small>
            <b>{patient.eta}</b>
          </span>
        </div>

        <ol>
          {patient.route.map((step, index) => (
            <li
              key={step}
              className={index === patient.route.length - 1 ? "last" : ""}
            >
              <i />
              {step}
            </li>
          ))}
        </ol>

        <button className="primary" onClick={onArrived}>
          Cheguei ao destino ✓
        </button>
      </section>

      <div className="map">
        <RouteMap patient={patient} />
      </div>
    </main>
  );
}

// Mapa visual com os pontos da rota
function RouteMap({ patient }) {
  return (
    <>
      <div className="room reception">
        RECEPÇÃO
        <small>TÉRREO</small>
        <b>VOCÊ</b>
      </div>
      <div className="room corridor">CORREDOR</div>
      <div className="room elevator">
        ELEVADOR
        <small>2</small>
      </div>
      <div className="room destination">
        {patient.room.toUpperCase()}
        <small>{patient.floor}</small>
      </div>
      <div className="path" />
    </>
  );
}
