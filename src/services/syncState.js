// Serviço de sincronização de estado entre Totem e Painel Hospitalar
// Usa BroadcastChannel + localStorage para comunicação entre abas

const STATE_KEY = "rotamed-state";
const CHANNEL_NAME = "rotamed-channel";

// Estado inicial vazio
const INITIAL_STATE = {
  arrivals: [],
  calledToken: null
};

// Lê o estado compartilhado do localStorage
export function readState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignora erros de parse
  }
  return { ...INITIAL_STATE };
}

// Escreve o estado e notifica outras abas via BroadcastChannel
export function writeState(newState) {
  localStorage.setItem(STATE_KEY, JSON.stringify(newState));
  try {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(newState);
    channel.close();
  } catch {
    // BroadcastChannel pode não estar disponível em alguns ambientes
  }
}

// Registra a chegada de um paciente no estado compartilhado
export function checkInPatient(patient) {
  const state = readState();
  const arrival = {
    ...patient,
    status: "Aguardando",
    arrivedAt: Date.now()
  };
  const updatedArrivals = [
    arrival,
    ...state.arrivals.filter((a) => a.token !== patient.token)
  ].slice(0, 8);

  const newState = { ...state, arrivals: updatedArrivals };
  writeState(newState);
  return newState;
}

// Chama um paciente pelo token (ação do painel hospitalar)
export function callPatient(token) {
  const state = readState();
  const newState = { ...state, calledToken: token };
  writeState(newState);
  return newState;
}

// Limpa todo o estado compartilhado
export function clearState() {
  writeState({ ...INITIAL_STATE });
}

// Hook para escutar mudanças de estado em tempo real
// Retorna uma função de cleanup para usar no useEffect
export function subscribeToState(callback) {
  let channel;

  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      callback(event.data);
    };
  } catch {
    // fallback: sem BroadcastChannel
  }

  // Também escuta mudanças de localStorage (outras janelas)
  const storageHandler = () => {
    callback(readState());
  };
  window.addEventListener("storage", storageHandler);

  // Retorna função de cleanup
  return () => {
    if (channel) {
      channel.close();
    }
    window.removeEventListener("storage", storageHandler);
  };
}
