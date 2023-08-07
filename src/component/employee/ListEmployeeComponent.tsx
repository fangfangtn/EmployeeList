import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from './EmployeeService';
import "./EmployeeList.style.css"
import { EditPencil, DeleteCircle, EyeEmpty } from 'iconoir-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeModal from './EmployeeModal'

export interface IEmployee{
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [dataToShow, setDataToShow] = useState(null as IEmployee | null)
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])
    
    const viewEmployee = (employeeId: any) => {
        EmployeeService.getEmployeeById(employeeId).then((response: any) => {
            setDataToShow(response.data)
            setShowModal(true)
            navigate('/employees')
       })
    }

    const closeModal = () => setShowModal(false)

    const getAllEmployees = () => {
        EmployeeService.getAllEmployee().then((response: any) => {
            setEmployees(response.data)
        })
    }

    const deleteEmployee = (employeeId: any) => {
        EmployeeService.deleteEmployee(employeeId).then((response: any) => {
            getAllEmployees();
        })
        toast('xóa thành công')
    }

    return (
        <div className="space-y-5 table-fixed">
            <h1 className="text-center font-bold"> List Employees </h1>
            <Link to="/add-employee" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        employees.map(
                            (employee: IEmployee)  =>
                                <tr key={employee.id}>
                                    <td> {employee.firstName} </td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td className='flex'>
                                        <Link to={`/edit-employee/${employee.id}`} ><EditPencil/></Link>
                                        <DeleteCircle onClick={() => deleteEmployee(employee.id)}
                                            style={{ marginLeft: "10px" }}/>
                                        <EyeEmpty onClick={() => viewEmployee(employee.id)}
                                            style={{ marginLeft: "10px" }}/>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
                {showModal && dataToShow !== null && (<EmployeeModal onClose={closeModal} data={dataToShow}/>)}
            </table>
            <ToastContainer/>
        </div>
    )
}

export default ListEmployeeComponent;