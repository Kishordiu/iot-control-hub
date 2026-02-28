export type DeviceStatus = "online" | "offline" | "warning" | "critical";

/* ================= DEVICE INTERFACE ================= */
export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  ipAddress: string;
  macAddress: string;

  /* Firmware & Security */
  firmwareVersion: string;          // Current firmware version
  metadata: {
    firmwareHash?: string;          // Hash of firmware for integrity check
    tamperDetected?: boolean;       // True if tamper detected
    [key: string]: unknown;
  };

  lockdown: boolean;                // True if device locked due to tamper
  lastSeen: string;
  location: string;
  tenantId: string;
  metrics: DeviceMetrics;
}

/* ================= DEVICE METRICS ================= */
export interface DeviceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  uptime: number;
  signalStrength: number;
}

/* ================= DEVICE COMMANDS ================= */
export interface DeviceCommand {
  type: "lock" | "unlock" | "reset" | "emergency_shutdown" | "admin_override";
  deviceId: string;
  issuedBy: string;
  timestamp: string;
}

/* ================= TENANT ================= */
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  deviceCount: number;
  activeDevices: number;
  plan: "starter" | "professional" | "enterprise";
}

/* ================= DASHBOARD STATS ================= */
export interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  criticalDevices: number;
  tamperedDevices: number;
  lockdownDevices: number;
  alertCount: number;
}

/* ================= USER & AUTH ================= */
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator" | "viewer";
  tenantId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/* ================= API RESPONSE TYPES ================= */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}