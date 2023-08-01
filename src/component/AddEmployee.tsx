import React, { useState } from 'react'
import { IEmployee } from './Employee.type'

type Props = {
    btnBack: () => void,
    btnSubmit: (data: IEmployee) => void
}

const AddEmployee = (props: Props) => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")

    const {btnBack, btnSubmit} = props

    const handleFirstName = (e: any) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e: any) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const data: IEmployee = {
            id: new Date().toJSON().toString(),
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        btnSubmit(data)
        btnBack()
    }
    
    return (
        <div>
            <div>
                <h3 className='font-bold'>Add Employee Form</h3>
            </div>
            <div className=' max-w-xs grid mx-auto w-full '>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name: </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="First Name" value={firstName} onChange={handleFirstName}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name: </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Last Name" value={lastName} onChange={handleLastName}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" value={email} onChange={handleEmail}/>
                    </div>
                    <div className='space-x-10'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={btnBack}>Back</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee