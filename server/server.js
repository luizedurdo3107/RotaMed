// RotaMed — Backend Express
// API de suporte à simulação de evento
// O frontend usa BroadcastChannel/localStorage como canal principal
// Este backend está pronto para evoluir para comunicação centralizada

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------
// Dados dos pacientes fictícios
// ---------------------------------------------------
const PATIENTS = [
  {
    cpf: "671.112.852-25",
    name: "João Almeida",
    type: "Consulta de Ortopedia",
    professional: "Dr. Carlos Almeida",
    time: "14:30",
    local: "Ambulatório de Ortopedia",
    token: "A-027",
    room: "Consultório 04",
    floor: "2º andar",
    eta: "2 min",
    route: ["Recepção — Térreo", "Corredor A", "Elevador 2", "2º Andar", "Ambulatório de Ortopedia"]
  },
  {
    cpf: "384.729.615-08",
    name: "Maria Santos",
    type: "Exame de Imagem",
    professional: "Dra. Fernanda Costa",
    time: "14:45",
    local: "Centro de Diagnóstico",
    token: "B-014",
    room: "Sala de Imagem 02",
    floor: "1º andar",
    eta: "3 min",
    route: ["Recepção — Térreo", "Corredor B", "Elevador 1", "1º Andar", "Centro de Diagnóstico"]
  },
  {
    cpf: "927.314.680-41",
    name: "Pedro Lima",
    type: "Consulta de Cardiologia",
    professional: "Dr. Rafael Mendes",
    time: "15:00",
    local: "Ambulatório de Cardiologia",
    token: "C-031",
    room: "Consultório 08",
    floor: "3º andar",
    eta: "4 min",
    route: ["Recepção — Térreo", "Corredor A", "Elevador 2", "3º Andar", "Ambulatório de Cardiologia"]
  },
  {
    cpf: "516.903.247-62",
    name: "Ana Beatriz",
    type: "Exame Laboratorial",
    professional: "Equipe Laboratorial",
    time: "15:15",
    local: "Laboratório Central",
    token: "D-009",
    room: "Coleta 03",
    floor: "Térreo",
    eta: "1 min",
    route: ["Recepção — Térreo", "Corredor C", "Laboratório Central", "Coleta 03"]
  },
  {
    cpf: "248.671.935-17",
    name: "Lucas Oliveira",
    type: "Consulta de Neurologia",
    professional: "Dra. Marina Alves",
    time: "15:30",
    local: "Ambulatório de Neurologia",
    token: "E-018",
    room: "Consultório 11",
    floor: "2º andar",
    eta: "3 min",
    route: ["Recepção — Térreo", "Corredor B", "Elevador 1", "2º Andar", "Ambulatório de Neurologia"]
  },
  {
    cpf: "803.425.719-36",
    name: "Camila Rocha",
    type: "Ultrassonografia",
    professional: "Dr. André Souza",
    time: "15:45",
    local: "Diagnóstico por Imagem",
    token: "F-022",
    room: "Sala de Ultrassom 01",
    floor: "1º andar",
    eta: "3 min",
    route: ["Recepção — Térreo", "Corredor C", "Elevador 1", "1º Andar", "Diagnóstico por Imagem"]
  }
];

// CPF secreto do painel hospitalar (nunca exposto na interface)
const SECRET_CPF = "455.608.555-97";

// ---------------------------------------------------
// Estado em memória da simulação
// ---------------------------------------------------
let arrivals = [];
let calledToken = null;

// ---------------------------------------------------
// Rotas da API
// ---------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "RotaMed" });
});

// Lista todos os pacientes (uso interno/debug)
app.get("/api/patients", (req, res) => {
  res.json(PATIENTS);
});

// Busca paciente por CPF
app.get("/api/patient/:cpf", (req, res) => {
  const cpf = req.params.cpf;

  // CPF secreto → não revelar dados de paciente
  if (cpf === SECRET_CPF || cpf === "455.608.555.97") {
    return res.status(403).json({ secret: true, message: "Acesso ao painel hospitalar." });
  }

  const patient = PATIENTS.find((p) => p.cpf === cpf);
  if (!patient) {
    return res.status(404).json({ error: "CPF de demonstração não encontrado." });
  }

  res.json(patient);
});

// Retorna o estado atual da simulação
app.get("/api/state", (req, res) => {
  res.json({ arrivals, calledToken });
});

// Registra chegada de paciente (check-in)
app.post("/api/checkin", (req, res) => {
  const patient = PATIENTS.find((p) => p.cpf === req.body.cpf);
  if (!patient) {
    return res.status(404).json({ error: "Paciente não encontrado." });
  }

  const arrival = { ...patient, status: "Aguardando", arrivedAt: Date.now() };
  arrivals = [
    arrival,
    ...arrivals.filter((a) => a.token !== patient.token)
  ].slice(0, 8);

  res.json({ ok: true, patient, state: { arrivals, calledToken } });
});

// Chama um paciente pelo token
app.post("/api/call/:token", (req, res) => {
  const exists = arrivals.some((a) => a.token === req.params.token);
  if (!exists) {
    return res.status(404).json({ error: "Token não encontrado." });
  }

  calledToken = req.params.token;
  res.json({ ok: true, state: { arrivals, calledToken } });
});

// Reseta o estado da simulação
app.post("/api/reset", (req, res) => {
  arrivals = [];
  calledToken = null;
  res.json({ ok: true, state: { arrivals, calledToken } });
});

// ---------------------------------------------------
// Inicia o servidor
// ---------------------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`RotaMed API rodando em http://localhost:${PORT}`);
});
