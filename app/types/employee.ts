export type EmployeeRole = 'Developer' | 'Lead' | 'Designer';

export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  status: EmployeeStatus;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  role: EmployeeRole;
  status: boolean; // true for Active, false for Inactive
}



