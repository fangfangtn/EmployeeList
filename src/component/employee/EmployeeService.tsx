import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://64c8ad34a1fe0128fbd60bba.mockapi.io/crud-api/employee";

class EmployeeService{

    getAllEmployee(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee: any){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId: string){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employeeId: string, employee: any){ 
        return axios.put(EMPLOYEE_API_BASE_URL + '/' +employeeId, employee);
    }

    deleteEmployee(employeeId: string){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

}

export default new EmployeeService()