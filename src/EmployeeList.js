import React, { useState } from 'react';
import './employeelist.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
    },
    {
      id: 2,
      firstName: 'Петр',
      lastName: 'Петров',
      email: 'petr@example.com',
    },
    // Добавьте других сотрудников по аналогии
  ]);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleAddEmployee = () => {
    // Генерируем уникальный id для нового сотрудника
    const newId = Math.max(...employees.map((employee) => employee.id)) + 1;

    // Создаем нового сотрудника
    const newEmployee = {
      id: newId,
      firstName: '',
      lastName: '',
      email: '',
    };

    // Добавляем нового сотрудника в список
    setEmployees([...employees, newEmployee]);

    // Открываем окно с детальной информацией для нового сотрудника
    handleShowDetails(newEmployee);
  };

  const handleDeleteEmployee = (id) => {
    // Удаляем сотрудника из списка
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);

    // Закрываем окно с детальной информацией, если удаляется выбранный сотрудник
    if (selectedEmployee && selectedEmployee.id === id) {
      setShowDetails(false);
      setSelectedEmployee(null);
    }
  };

  const handleInputChange = (event, key) => {
    // Обновляем значения полей для выбранного сотрудника
    const updatedEmployee = { ...selectedEmployee, [key]: event.target.value };
    setSelectedEmployee(updatedEmployee);

    // Обновляем список сотрудников с обновленными значениями
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h1>Список сотрудников</h1>
      <ul className='employee-list'>
        {employees.map((employee) => (
          <li key={employee.id} onClick={() => handleShowDetails(employee)}>
            {employee.firstName} {employee.lastName}
            <button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddEmployee}>Добавить сотрудника</button>

      {/* Всплывающее окно с детальной информацией о сотруднике */}
      {showDetails && selectedEmployee && (
        <div className='employee-details'>
          <h2>Детальная информация</h2>
          <p>Имя: <input value={selectedEmployee.firstName} onChange={(e) => handleInputChange(e, 'firstName')} /></p>
          <p>Фамилия: <input value={selectedEmployee.lastName} onChange={(e) => handleInputChange(e, 'lastName')} /></p>
          <p>Email: <input value={selectedEmployee.email} onChange={(e) => handleInputChange(e, 'email')} /></p>
          <p>ID: {selectedEmployee.id}</p>
          <button onClick={() => setShowDetails(false)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
