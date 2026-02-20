export type DeviceStatus = "online" | "offline" | "warning" | "critical";

export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  lastSeen: string;
  location: string;
  tenantId: string;
  metadata: Record<string, unknown>;
  metrics: DeviceMetrics;
}

export interface DeviceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  uptime: number;
  signalStrength: number;
}

export interface DeviceCommand {
  type: "lock" | "unlock" | "reset" | "emergency_shutdown";
  deviceId: string;
  issuedBy: string;
  timestamp: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  deviceCount: number;
  activeDevices: number;
  plan: "starter" | "professional" | "enterprise";
}

export interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  warningDevices: number;
  criticalDevices: number;
  alertCount: number;
}

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
