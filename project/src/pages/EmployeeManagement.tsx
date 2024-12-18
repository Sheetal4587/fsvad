import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Trophy, Users, Calendar, DollarSign, UserPlus, Trash2 } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  metrics: {
    performanceScore: number;
    customerRating: number;
    activeDeals: number;
    closedDeals: number;
    successRate: number;
    revenueGenerated: number;
  };
  attendance: {
    present: number;
    absent: number;
    leaves: number;
    totalDays: number;
  };
  payroll: {
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
  performanceHighlights: string[];
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    expertise: [],
    languages: ['English'],
    metrics: {
      activeDeals: 0,
      closedDeals: 0,
      successRate: 0,
      customerRating: 0,
      revenueGenerated: 0,
      performanceScore: 0
    },
    attendance: {
      present: 0,
      absent: 0,
      leaves: 0,
      totalDays: 0
    },
    payroll: {
      basicSalary: 0,
      allowances: 0,
      deductions: 0,
      netSalary: 0
    }
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEmployee,
          payroll: {
            ...newEmployee.payroll,
            netSalary: Number(newEmployee.payroll.basicSalary) + 
                      Number(newEmployee.payroll.allowances) - 
                      Number(newEmployee.payroll.deductions)
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add employee');
      }

      const data = await response.json();
      console.log('Employee added successfully:', data);
      
      // Refresh the employee list
      await fetchEmployees();
      
      // Reset form
      setNewEmployee({
        name: '',
        role: '',
        email: '',
        phone: '',
        expertise: [],
        languages: ['English'],
        metrics: {
          activeDeals: 0,
          closedDeals: 0,
          successRate: 0,
          customerRating: 0,
          revenueGenerated: 0,
          performanceScore: 0
        },
        attendance: {
          present: 0,
          absent: 0,
          leaves: 0,
          totalDays: 0
        },
        payroll: {
          basicSalary: 0,
          allowances: 0,
          deductions: 0,
          netSalary: 0
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      fetchEmployees();
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  const getTopPerformer = () => {
    if (employees.length === 0) return null;
    return employees.reduce((prev, current) => 
      (prev.metrics.performanceScore > current.metrics.performanceScore) ? prev : current
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Top Performer Card */}
      {employees.length > 0 && getTopPerformer() && (
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white transform hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-8 w-8 text-yellow-300" />
              Star Performer of the Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{getTopPerformer()?.name}</h3>
                <p className="text-lg opacity-90">{getTopPerformer()?.role}</p>
                <div className="flex items-center gap-2 text-yellow-300">
                  <span>★</span>
                  <span className="text-sm">Customer Rating: {getTopPerformer()?.metrics.customerRating}/5</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div>
                  <p className="text-sm opacity-90">Performance Score</p>
                  <p className="text-3xl font-bold">{getTopPerformer()?.metrics.performanceScore}%</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Revenue Generated</p>
                  <p className="text-xl font-semibold">₹{(getTopPerformer()?.metrics.revenueGenerated / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Manage Employees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Customer Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.metrics.performanceScore}%</TableCell>
                  <TableCell>{employee.metrics.customerRating}/5</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="attendance">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Present Days</TableHead>
                <TableHead>Absent Days</TableHead>
                <TableHead>Leaves Taken</TableHead>
                <TableHead>Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.attendance.present}</TableCell>
                  <TableCell>{employee.attendance.absent}</TableCell>
                  <TableCell>{employee.attendance.leaves}</TableCell>
                  <TableCell>
                    {((employee.attendance.present / employee.attendance.totalDays) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="payroll">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>₹{employee.payroll.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{employee.payroll.allowances.toLocaleString()}</TableCell>
                  <TableCell>₹{employee.payroll.deductions.toLocaleString()}</TableCell>
                  <TableCell>₹{employee.payroll.netSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Add New Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEmployee} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-700">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-blue-700">Job Role</Label>
                    <Input
                      id="role"
                      placeholder="Financial Advisor"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-700">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary" className="text-blue-700">Basic Salary (₹)</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      placeholder="50000"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.payroll.basicSalary}
                      onChange={(e) => setNewEmployee({
                        ...newEmployee,
                        payroll: {
                          ...newEmployee.payroll,
                          basicSalary: Number(e.target.value),
                          netSalary: Number(e.target.value) + newEmployee.payroll.allowances - newEmployee.payroll.deductions
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances" className="text-blue-700">Allowances (₹)</Label>
                    <Input
                      id="allowances"
                      type="number"
                      placeholder="10000"
                      className="border-blue-200 focus:border-blue-500"
                      value={newEmployee.payroll.allowances}
                      onChange={(e) => setNewEmployee({
                        ...newEmployee,
                        payroll: {
                          ...newEmployee.payroll,
                          allowances: Number(e.target.value),
                          netSalary: newEmployee.payroll.basicSalary + Number(e.target.value) - newEmployee.payroll.deductions
                        }
                      })}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add New Employee
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
