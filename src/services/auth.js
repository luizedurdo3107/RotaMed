// Serviço de autenticação de CPF da simulação RotaMed
// Distingue CPFs de pacientes do CPF secreto do painel hospitalar

import { getPatientByCpf } from "./cycleManager.js";

// CPF secreto para acesso ao painel hospitalar
// Aceita os dois formatos: com ponto final ou com hífen
const SECRET_CPF_WITH_HYPHEN = "455.608.555-97";
const SECRET_CPF_WITH_DOT = "455.608.555.97";

// Formata uma string de dígitos como CPF: XXX.XXX.XXX-XX
export function formatCpf(digits) {
  const d = digits.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Normaliza qualquer formato de CPF para o padrão XXX.XXX.XXX-XX
export function normalizeCpf(raw) {
  // Remove tudo que não for dígito
  const digits = raw.replace(/\D/g, "");

  if (digits.length !== 11) return raw;

  // Reconstrói no formato padrão com hífen
  return formatCpf(digits);
}

// Verifica se o CPF digitado é o CPF secreto do hospital
export function isHospitalSecret(raw) {
  const normalized = normalizeCpf(raw);
  // Aceita com hífen ou com ponto no final
  return (
    normalized === SECRET_CPF_WITH_HYPHEN ||
    raw.trim() === SECRET_CPF_WITH_DOT ||
    raw.trim() === SECRET_CPF_WITH_HYPHEN
  );
}

// Resultado possíveis da validação:
// { type: "hospital" }   → abre painel hospitalar
// { type: "patient", patient: {...} } → exibe dados do paciente
// { type: "error", message: "..." }   → CPF não encontrado

export function validateCpf(rawInput) {
  const normalized = normalizeCpf(rawInput);

  // Verifica primeiro se é o CPF secreto
  if (isHospitalSecret(rawInput)) {
    return { type: "hospital" };
  }

  // Tenta encontrar o paciente pelo CPF normalizado
  const patient = getPatientByCpf(normalized);
  if (patient) {
    return { type: "patient", patient };
  }

  // CPF não encontrado
  return {
    type: "error",
    message: "CPF de demonstração não encontrado."
  };
}
