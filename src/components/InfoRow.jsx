import React from "react";

// Componente reutilizável para exibir um par rótulo + valor
export function InfoRow({ label, value }) {
  return (
    <div className="info">
      <small>{label}</small>
      <span>{value}</span>
    </div>
  );
}
