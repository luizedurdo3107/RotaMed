import React from "react";

// Teclado numérico para entrada do CPF no totem
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", ""];

export function Keypad({ onAdd, onDelete }) {
  return (
    <div className="keypad">
      {KEYS.map((key, index) => {
        if (key === "") {
          // Espaço vazio na grade (posição do zero fica no meio)
          return <div key={index} />;
        }

        if (key === "⌫") {
          return (
            <button key={index} onClick={onDelete}>
              {key}
            </button>
          );
        }

        return (
          <button key={index} onClick={() => onAdd(key)}>
            {key}
          </button>
        );
      })}
    </div>
  );
}
