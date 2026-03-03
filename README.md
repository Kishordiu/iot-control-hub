🔐 Void-Trust
Secure Hardware Architecture for Zero-Trust IoT Systems

🧠 Problem Statement (CMV26403)
Design a secure, hardware-level architecture to implement zero-trust principles for large-scale IoT and cyber-physical systems.
The system must support:

i~ Secure Boot
i~ Hardware Root of Trust
i~ Device Authentication
i~ Encrypted Communication
i~ Real-Time Tamper Detection
i~ Scalability for smart cities and industrial IoT

🚀 Our Solution

Void-Trust is a Zero-Trust IoT security architecture that enforces continuous cryptographic verification of devices and dynamically manages device trust state.

The system is divided into two layers:
🏗 Architecture Overview


[ IoT Device (ESP32 / Future Secure Hardware) ]
            ↓
   HTTPS Signed Request
            ↓
Zero-Trust Verification Layer (Supabase Edge Function)
            ↓
HMAC Verification + Replay Protection
            ↓
Trust State Update (Database)
            ↓
Dashboard / Control System

🔐 Phase 1 – Zero-Trust Enforcement Layer (Implemented)

✅ Device Authentication
HMAC-SHA256 per-device secret
Server-side signature recalculation

✅ Replay Protection
Timestamp validation (5-minute window)
Prevents reused packet attacks

✅ Encrypted Communication
HTTPS (TLS secured)

✅ Real-Time Tamper Detection
If event_type = TAMPER_DETECTED:
trust_state → compromised
lockdown → true

✅ Trust State Management
verified
compromised
lockdown enabled

🧩 Phase 2 – Secure Hardware Architecture (Designed)

To fully meet hardware-level requirements:

🔹 Secure Boot
Digitally signed firmware
Bootloader verification before execution
🔹 Hardware Root of Trust
Secure element (e.g., ATECC608A) or ESP32 eFuse storage
Secret key never exposed to firmware layer
🔹 On-Device Tamper Detection
GPIO tamper switch
Voltage anomaly detection
Physical enclosure sensor
🔹 Signed Hardware Events
All tamper events cryptographically signed before transmission.

🛡 Zero-Trust Principles Implemented
Never trust device permanently
Verify every request
Enforce cryptographic identity
Revoke trust dynamically
Lock compromised nodes automatically

🌍 Scalability
Designed for deployment across:
Smart Cities
Industrial IoT
Critical Infrastructure
Cyber-Physical Systems
Serverless backend ensures horizontal scalability.

📊 Current Status
Phase 1 – Zero-Trust Backend: ✅ Complete
Phase 2 – Secure Hardware Module: 🔜 In Development
The backend is production-ready and supports direct hardware integration without architectural modification.

💡 Innovation
Unlike traditional IoT systems that trust devices after initial provisioning, Void-Trust enforces continuous cryptographic validation and dynamic trust enforcement.
This establishes the foundation for a hardware-backed Zero-Trust IoT security architecture.