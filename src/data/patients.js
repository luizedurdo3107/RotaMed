// Dados fictícios dos 6 pacientes da simulação RotaMed
// Todos os dados são exclusivamente para fins de simulação em evento

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
    route: [
      "Recepção — Térreo",
      "Corredor A",
      "Elevador 2",
      "2º Andar",
      "Ambulatório de Ortopedia"
    ]
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
    route: [
      "Recepção — Térreo",
      "Corredor B",
      "Elevador 1",
      "1º Andar",
      "Centro de Diagnóstico"
    ]
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
    route: [
      "Recepção — Térreo",
      "Corredor A",
      "Elevador 2",
      "3º Andar",
      "Ambulatório de Cardiologia"
    ]
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
    route: [
      "Recepção — Térreo",
      "Corredor C",
      "Laboratório Central",
      "Coleta 03"
    ]
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
    route: [
      "Recepção — Térreo",
      "Corredor B",
      "Elevador 1",
      "2º Andar",
      "Ambulatório de Neurologia"
    ]
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
    route: [
      "Recepção — Térreo",
      "Corredor C",
      "Elevador 1",
      "1º Andar",
      "Diagnóstico por Imagem"
    ]
  }
];

export default PATIENTS;
