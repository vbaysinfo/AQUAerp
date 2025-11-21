
import React from 'react';

export interface SubNavItem {
  id: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: SubNavItem[];
}

export interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: React.ReactNode;
}

export interface Order {
  id: string;
  customer: string;
  amount: string;
  status: 'Pending' | 'Confirmed' | 'In Transit' | 'Delivered' | 'Paid';
}

export interface InventoryItem {
  warehouse: string;
  feedType: string;
  quantity: number;
  status: 'Healthy' | 'Low Stock' | 'Critical';
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  avatar: string;
  email: string;
  phone: string;
  joinDate: string;
  mobileAppAccess: boolean;
  lastLogin?: string;
  permissions: string[]; // e.g., ['feed', 'crm']
}

// --- New Pond Interfaces ---

export interface WaterQuality {
  ph: number;
  do: number; // Dissolved Oxygen
  salinity: number;
  temp: number;
  ammonia: number;
  turbidity: number;
  lastUpdated: string;
}

export interface FeedData {
  dailyIntake: number; // kg
  feedType: string;
  fcr: number; // Feed Conversion Ratio
  lastFed: string;
  history: { day: string; amount: number }[];
}

export interface StockingData {
  date: string;
  quantity: number; // PL count
  species: string; // e.g., Vannamei
  density: number; // per m2
  survivalRateEst: number; // percentage
  currentABW: number; // Average Body Weight in grams
  doc: number; // Days of Culture
}

export interface HealthLog {
  date: string;
  type: 'Medicine' | 'Probiotic' | 'Minerals';
  name: string;
  quantity: string;
  reason: string;
}

export interface Pond {
  id: string;
  name: string;
  status: 'Active' | 'Harvesting' | 'Preparation' | 'Empty';
  size: number; // hectares or m2
  water: WaterQuality;
  stocking: StockingData;
  feed: FeedData;
  health: HealthLog[];
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  region: string;
  acres: number;
  ponds: number;
  technicianName: string;
  technicianPhone: string;
  status: 'Active' | 'Pending' | 'Inactive';
  clv: string;
  cac: string;
  retention: string;
  avatar: string;
  since: string;
  email: string;
  pondsList?: Pond[]; // Added detailed list
}
