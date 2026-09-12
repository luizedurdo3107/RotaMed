# RotaMed — Simulação para Evento

Simulador de fluxo hospitalar para uso em eventos. Exibe um totem interativo para pacientes e um painel de monitoramento para funcionários do hospital.

---

## Estrutura do Projeto

```
RotaMed/
├── index.html
├── package.json
├── iniciar-rotamed.ps1
├── README.md
│
├── src/
│   ├── App.jsx                    ← Raiz da aplicação
│   ├── main.jsx                   ← Entry point React
│   ├── styles.css                 ← Estilos globais
│   │
│   ├── components/
│   │   ├── Header.jsx             ← Header do Totem e do Painel
│   │   ├── Keypad.jsx             ← Teclado numérico para CPF
│   │   └── InfoRow.jsx            ← Par rótulo/valor reutilizável
│   │
│   ├── pages/
│   │   ├── Kiosk.jsx              ← Orquestra o fluxo do totem
│   │   ├── StepIdentify.jsx       ← Tela 1: entrada de CPF
│   │   ├── StepPatient.jsx        ← Tela 2: dados do atendimento
│   │   ├── StepToken.jsx          ← Tela 3: token + aguardar chamada
│   │   ├── StepRoute.jsx          ← Tela 4: mapa e rota
│   │   ├── StepDestination.jsx    ← Tela 5: chegada + "Entendi"
│   │   └── Hospital.jsx           ← Painel hospitalar
│   │
│   ├── data/
│   │   └── patients.js            ← Dados dos 6 pacientes fictícios
│   │
│   └── services/
│       ├── auth.js                ← Validação de CPF e CPF secreto
│       ├── cycleManager.js        ← Rodízio automático dos CPFs
│       └── syncState.js           ← Comunicação Totem ↔ Painel
│
└── server/
    ├── server.js                  ← API Express (suporte/futuro)
    └── package.json
```

---

## Instalação e Execução

### Opção 1 — Script automático (Windows)

Execute na pasta `RotaMed`:

```powershell
.\iniciar-rotamed.ps1
```

### Opção 2 — Manual

**Terminal 1 — Frontend** (pasta `RotaMed`):

```powershell
npm install
npm run dev
```

Abra `http://localhost:5173`.

**Terminal 2 — Backend** (pasta `RotaMed/server`):

```powershell
npm install
npm start
```

A API fica em `http://localhost:3001`.

---

## Como Usar no Evento

1. Abra **duas janelas** em `http://localhost:5173`.
2. **Janela 1** → Totem (para o visitante).
3. **Janela 2** → Digite o CPF secreto para abrir o Painel Hospitalar.

### Fluxo do Visitante

1. O totem exibe **um CPF por vez** (rodízio automático).
2. O visitante digita o CPF mostrado.
3. O sistema identifica o paciente e exibe os dados do atendimento.
4. O visitante confirma a chegada e recebe o **token**.
5. O funcionário no painel clica em **"Chamar paciente"**.
6. O totem libera o botão **"Ver minha rota"**.
7. O visitante vê o mapa e chega ao destino.
8. Aparece a tela de chegada com o botão **"Entendi"**.
9. Ao clicar, o sistema reseta e exibe o **próximo CPF** automaticamente.

---

## CPF Secreto — Painel Hospitalar

```
455.608.555.97
```

ou

```
455.608.555-97
```

Ambos os formatos são aceitos. O CPF secreto **nunca aparece na interface** do totem.

---

## Pacientes da Simulação

| CPF | Nome | Atendimento | Token |
|---|---|---|---|
| 671.112.852-25 | João Almeida | Consulta de Ortopedia | A-027 |
| 384.729.615-08 | Maria Santos | Exame de Imagem | B-014 |
| 927.314.680-41 | Pedro Lima | Consulta de Cardiologia | C-031 |
| 516.903.247-62 | Ana Beatriz | Exame Laboratorial | D-009 |
| 248.671.935-17 | Lucas Oliveira | Consulta de Neurologia | E-018 |
| 803.425.719-36 | Camila Rocha | Ultrassonografia | F-022 |

> Todos os dados são fictícios e exclusivos para a simulação.

---

## Sistema de Rodízio

- O sistema mostra **um CPF por vez** na tela inicial.
- Ao clicar em **"Entendi"**, o CPF atual é marcado como utilizado.
- O próximo CPF é selecionado automaticamente.
- Após todos os 6 serem usados, uma nova rodada começa com **ordem embaralhada**.

---

## Comunicação entre Telas

O frontend usa **BroadcastChannel** + **localStorage** para sincronizar o estado entre o totem e o painel hospitalar em tempo real, sem depender do backend durante a apresentação.

O backend Express está incluído como base para evolução futura para banco de dados centralizado.
