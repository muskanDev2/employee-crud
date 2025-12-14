'use client';

import { useState, useEffect, useCallback } from 'react';
import { Employee, EmployeeRole, EmployeeStatus } from '../types/employee';

const STORAGE_KEY = 'employees';
const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Lead',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Designer',
    status: 'Inactive',
  },
];

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Load employees from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Employee[];
        setEmployees(parsed);
      } else {
        setEmployees(INITIAL_EMPLOYEES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EMPLOYEES));
      }
    } catch (error) {
      console.error('Error loading employees from localStorage:', error);
      setEmployees(INITIAL_EMPLOYEES);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever employees change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
      } catch (error) {
        console.error('Error saving employees to localStorage:', error);
      }
    }
  }, [employees, loading]);

  const addEmployee = useCallback((employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setEmployees((prev) => [...prev, newEmployee]);
    return newEmployee;
  }, []);

  const updateEmployee = useCallback((id: string, employee: Omit<Employee, 'id'>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...employee, id } : emp))
    );
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  const getEmployeeById = useCallback(
    (id: string) => {
      return employees.find((emp) => emp.id === id);
    },
    [employees]
  );

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  };
}



