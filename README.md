# Loan Offers Tool

A full‑stack demo solution for the **Driva Full‑Stack Engineer Home Assignment**. The application lets borrowers submit personal & loan details and instantly see lender offers calculated on the server.

---

## Table of contents
1. [Tech stack](#tech-stack)
2. [Monorepo layout](#monorepo-layout)
3. [Prerequisites](#prerequisites)
4. [Quick start](#quick-start)
5. [Scripts](#scripts)
6. [Environment variables](#environment-variables)
7. [API reference](#api-reference)
8. [Business logic](#business-logic)
9. [Validation & security](#validation--security)
10. [Testing](#testing)
11. [Architecture overview](#architecture-overview)
12. [Deployment](#deployment)
13. [Contributing](#contributing)
14. [License](#license)

---

## Tech stack

### Front‑end
| Purpose | Library / Tool |
| --- | --- |
| UI & SPA | **React 18** + **Vite** + **TypeScript** |
| Forms | **react‑hook‑form** + **@hookform/resolvers** + **zod** |
| Routing | **React Router v7** |
| e2e tests | **Cypress** |

### Back‑end
| Purpose | Library / Tool |
| --- | --- |
| Runtime | **Node 18** |
| Framework | **Express** + **TypeScript** |
| Validation | **zod** |
| Persistence | In‑memory `Map` (no external DB) |
| Testing | **Jest** |
| Lint / format | **eslint** + **prettier** |

---

## Monorepo layout
```
.
app/
├─ backend/            # Express API (TypeScript)
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ services/
│  │  ├─ routes/
│  │  ├─ middleware/
├─ frontend/           # React SPA (TypeScript)
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  └─ lib/validation.ts
│  └─ cypress/
lib/
│  └─ schemas/     # Zod schemas reused by both FE and BE
│  └─ utils/     # Shared utils and functions reused by both FE and BE
│  └─ types/     # Shared types reused by both FE and BE
├─ pnpm-workspace.yaml
└─ package.json        # root scripts
```

---

## Prerequisites
- **Node.js ≥ 18** (LTS recommended)
- **pnpm ≥ 8** 
- **Git**

---

## Quick start
```bash
# 1. Clone
$ git clone https://github.com/flashery/driva.git
$ cd driva

# 2. Install dependencies for ALL workspaces
$ pnpm install --filter backend        # backend
$ pnpm install --filter frontend       # frontend

# 3. Start both servers in dev‑watch mode
$ pnpm --filter backend run dev
$ pnpm --filter frontend run dev

# → Front‑end  http://localhost:5173
# → Back‑end   http://localhost:3000/api/v1
```

---

## Scripts
All commands are run from the repository root.

| Command | Description |
| --- | --- |
| `pnpm --filter backend …` | Run a script only for the backend workspace |
| `pnpm --filter frontend …` | Run a script only for the frontend workspace |

Examples:
```bash
# backend unit tests
pnpm --filter backend test

# e2e
pnpm --filter frontend test:e2e
```

---

## Environment variables

### Backend (`backend/.env`)
```
API_TOKEN=super-secret-key
ROUTE_PREFIX=/api/v1
PORT=3000
HOST=localhost
```
---

## API reference

### POST `/api/v1/loan/apply`
Submits borrower data and returns lender offers.

**Request body**
```jsonc
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "employmentStatus": "Employed",
  "employerName": "ACME Inc.",
  "loanPurpose": "Vehicle",
  "amount": 10000,
  "deposit": 2000,
  "loanTerm": 5
}
```

**Response `200 OK`**
```jsonc
[
    {
        "lenderName": "Lender A",
        "interestRate": 5.5,
        "fees": "$10 processing fee",
        "monthlyRepayment": 191.01
    },
    {
        "lenderName": "Lender B",
        "interestRate": 5,
        "fees": "$15 application fee",
        "monthlyRepayment": 188.71
    },
    {
        "lenderName": "Lender C",
        "interestRate": 6,
        "fees": "No fees",
        "monthlyRepayment": 193.33
    }
]
```

---

## Validation & security
- End‑to‑end schemas shared via **Zod** (DRY between FE & BE).
- Server sanitises input, strips unknown fields and returns typed errors (HTTP 422).
- CORS restricted to `CORS_ORIGIN`.

---

## Testing
| Layer | Tooling | Command |
| --- | --- | --- |
| BE unit / integration | Jest | `pnpm --filter backend test` |
| FE e2e | Cypress | `pnpm --filter frontend test:e2e` |

---

## Architecture overview
A **thin, typed monorepo**. The back‑end exposes a small REST surface focused on the assignment’s business logic. The front‑end consumes that API with a wizard‑style form (personal detail → loan detail → lender offers). Until a real database is introduced, the API persists applications in a process‑local `Map`. Swapping to Postgres or DynamoDB later requires only a new repository class.

Key design choices:
- **Single source of truth** for schemas.
- **Atomic‑design components** keep the UI small and reusable.
- **Functional, pure services** make the business logic easy to unit‑test.
- **SOLID & DRY** principles guide folder structure.

---

## License
MIT © 2025 Yves Gonzaga

