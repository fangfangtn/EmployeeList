import { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from './EmployeeService';
import "./EmployeeList.style.css"
import { EditPencil, DeleteCircle, EyeAlt } from 'iconoir-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeModal from './EmployeeModal'
import { Dialog, Transition } from '@headlessui/react'

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
    const [isOpen, setIsOpen] = useState(false)
    const [dataToDeleteId, setDataToDeleteId] = useState<string | null>(null);

    function closeModalDelete() {
        setIsOpen(false)
      }
    
      function openModalDelete(employeeId: string) {
        setDataToDeleteId(employeeId);
        setIsOpen(true)
      }

    useEffect(() => {
        getAllEmployees();
    }, [])
    
    const viewEmployee = (employeeId: any) => {
        EmployeeService.getEmployeeById(employeeId)
        .then((response: any) => {
            setDataToShow(response.data)
            setShowModal(true)
            navigate('/employees')
       })
    }

    const closeModal = () => setShowModal(false)

    const getAllEmployees = () => {
        EmployeeService.getAllEmployee()
        .then((response: any) => {
            setEmployees(response.data)
        })
    }

    const deleteEmployee = (employeeId: string) => {
        EmployeeService.deleteEmployee(employeeId)
        .then((response: any) => {
            getAllEmployees();
            closeModalDelete();  
            toast.success('Xóa thành công');
        })
        .catch((error: any) => {
            toast.error('Xóa thất bại');
        });
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
                                        <DeleteCircle onClick={() => openModalDelete(employee.id)}
                                            style={{ marginLeft: "50px" }}/>
                                        <EyeAlt onClick={() => viewEmployee(employee.id)}
                                            style={{ marginLeft: "50px" }}/>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
                {showModal && dataToShow !== null && (<EmployeeModal onClose={closeModal} data={dataToShow}/>)}
            </table>
            <ToastContainer/>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Cảnh báo
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        Bạn có muốn xóa không?
                                        </p>
                                    </div>

                                    <div className="mt-4 space-x-[50%]">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                if (dataToDeleteId) {
                                                    deleteEmployee(dataToDeleteId);
                                                    closeModalDelete();
                                                }
                                            }}
                                        >
                                            Có
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModalDelete}
                                        >
                                            Không
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
export default ListEmployeeComponent;