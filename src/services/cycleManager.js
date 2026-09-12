// Gerenciador de ciclos da simulação RotaMed
// Controla o rodízio dos CPFs dos pacientes

import PATIENTS from "../data/patients.js";

const CYCLE_KEY = "rotamed-cycle";

// Embaralha um array (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Lê o estado do ciclo do localStorage
function readCycle() {
  try {
    const raw = localStorage.getItem(CYCLE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignora erros de parse
  }
  return null;
}

// Salva o estado do ciclo no localStorage
function writeCycle(cycle) {
  localStorage.setItem(CYCLE_KEY, JSON.stringify(cycle));
}

// Inicializa um novo ciclo com ordem embaralhada
function initNewCycle() {
  const order = shuffle(PATIENTS.map((p) => p.cpf));
  const cycle = {
    order,        // CPFs na ordem embaralhada para esta rodada
    used: [],     // CPFs já utilizados nesta rodada
    currentCpf: order[0]  // CPF atual em exibição
  };
  writeCycle(cycle);
  return cycle;
}

// Retorna o CPF atual a ser exibido no totem
export function getCurrentCpf() {
  let cycle = readCycle();

  // Se não existe ciclo, cria um novo
  if (!cycle) {
    cycle = initNewCycle();
  }

  // Se todos foram utilizados, reinicia com nova rodada embaralhada
  if (cycle.used.length >= PATIENTS.length) {
    cycle = initNewCycle();
  }

  // Encontra o próximo CPF não utilizado
  const next = cycle.order.find((cpf) => !cycle.used.includes(cpf));
  if (!next) {
    // Caso de segurança: reinicia
    cycle = initNewCycle();
  }

  cycle.currentCpf = next || cycle.order[0];
  writeCycle(cycle);

  return cycle.currentCpf;
}

// Marca o CPF atual como utilizado e avança para o próximo
export function advanceCycle() {
  let cycle = readCycle();
  if (!cycle) {
    cycle = initNewCycle();
    return cycle.currentCpf;
  }

  const current = cycle.currentCpf;

  // Adiciona ao utilizado se ainda não está lá
  if (current && !cycle.used.includes(current)) {
    cycle.used = [...cycle.used, current];
  }

  // Verifica se todos foram utilizados
  if (cycle.used.length >= PATIENTS.length) {
    // Nova rodada com ordem diferente
    cycle = initNewCycle();
    return cycle.currentCpf;
  }

  // Encontra o próximo disponível
  const next = cycle.order.find((cpf) => !cycle.used.includes(cpf));
  if (!next) {
    cycle = initNewCycle();
    return cycle.currentCpf;
  }

  cycle.currentCpf = next;
  writeCycle(cycle);

  return next;
}

// Retorna dados do paciente pelo CPF
export function getPatientByCpf(cpf) {
  return PATIENTS.find((p) => p.cpf === cpf) || null;
}

// Reseta completamente o ciclo (útil para debug)
export function resetCycle() {
  localStorage.removeItem(CYCLE_KEY);
}
