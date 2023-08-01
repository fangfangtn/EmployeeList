import React, { useState } from 'react'
import './EmployeeList.style.css'
import { IEmployee } from './Employee.type'
import EmployeeModal from './EmployeeModal'

type Props = {
    list: IEmployee[],
    btnDelete: (data: IEmployee) => void,
    btnEdit: (data: IEmployee) => void
}

const EmployeeList = (props: Props) => {
    const {list, btnDelete, btnEdit} = props

    const [showModal, setShowModal] = useState(false)
    const [dataToShow, setDataToShow] = useState(null as IEmployee | null)

    const viewEmployee = (data: IEmployee) => {
        setDataToShow(data)
        setShowModal(true)
    }

    const closeModal = () => setShowModal(false)
    
    return (
        <div>
            <table className='table-fixed'>
                <tr>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
                {list.map(employee => {
                    return (
                    <tr key={employee.id}>
                            <td>{`${employee.firstName}`}</td>
                            <td>{`${employee.lastName}`}</td>
                            <td>{employee.email}</td>
                            <td>
                                <div className='space-x-5'>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => btnEdit(employee)}>Update</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => btnDelete(employee)}>Delete</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => viewEmployee(employee)}>View</button>
                                </div>
                            </td>
                        </tr> 
                    )
                })} 
                {showModal && dataToShow !== null && (<EmployeeModal onClose={closeModal} data={dataToShow}/>)}
                </table>
        </div>
    )
}

export default EmployeeList