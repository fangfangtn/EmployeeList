import React from 'react'
import './EmployeeModal.style.css'
import { IEmployee } from './Employee.type'

type Props = {
    onClose: () => void,
    data: IEmployee
}

const EmployeeModal = (props: Props) => {
  const {onClose, data} = props

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          <h3 className='font-bold my-5'>Employee Data</h3>
          <div>
            <div>
              <label>First Name: {data.firstName}</label>
            </div>
            <div>
              <label>Last Name: {data.lastName}</label>
            </div>
            <div>
              <label>Email: {data.email}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal