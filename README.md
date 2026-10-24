![IOT CONTROL HUB — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

# IOT CONTROL HUB

**A device-operations workspace for reviewing connected-device state, telemetry, and control workflows.**

IoT Control Hub is a React/TypeScript interface built around device inventory and operator-facing actions. The current frontend reads device and telemetry data through Supabase and uses Supabase channels for telemetry updates in the device detail flow. Device commands and security decisions still depend on the backend, row policies, and device-side integrations being correctly configured.

## The operator loop

```text
Device registry
      │
      ▼
Dashboard / device detail
      │
      ├──► Read device metadata
      ├──► Review stored telemetry
      └──► Present control actions
                │
                ▼
      Configured backend / device layer
```

## What the interface covers

- **Fleet overview:** Summary cards for device state and stored logs.
- **Device detail:** Read a selected device record and its telemetry history.
- **Telemetry updates:** Supabase realtime subscription is used in the device detail flow when the database is configured.
- **Control surfaces:** Device-control UI for operator workflows; actual command delivery depends on the configured service and device implementation.

## Stack

React · TypeScript · Vite · Supabase JavaScript client · React Router · TanStack Query · Recharts · Framer Motion

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/iot-control-hub.git
cd iot-control-hub
npm ci
npm run dev
```

The local URL is printed by Vite. Configure the intended Supabase URL and public anon/publishable key in the project’s local environment setup before testing database-backed views.

## Production boundary

A dashboard value is only as reliable as the underlying records and policies. Verify Row Level Security, operator permissions, backend authorization, command acknowledgement, device identity, and event provenance before connecting real devices. Do not place service-role keys or hardware secrets in browser-exposed `VITE_*` variables.

---

<p align="center"><sub>DIU FOUNDRY · CONNECTED SYSTEMS / OPERATIONS DESIGN</sub></p>
