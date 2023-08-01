import React, { useEffect, useState } from 'react'
import { IEmployee, PageEnum } from './Employee.type'
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [employeeList, setEmployeeList] = useState([] as IEmployee[])
    const [showPage, setShowPage] = useState(PageEnum.list)
    const [dataEdit, setDataEdit] = useState({} as IEmployee)

    useEffect(() => {
        const listString = window.localStorage.getItem('EmployeeList')
        if (listString) {
            _setEmployeeList(JSON.parse(listString))
        }
    }, [])

    const addEmployee = () => {
        setShowPage(PageEnum.add)
    }

    const showListPage = () => {
        setShowPage(PageEnum.list)
    }

    const _setEmployeeList = (list: IEmployee[]) => {
        setEmployeeList(list)
        window.localStorage.setItem('EmployeeList', JSON.stringify(list))
    }

    const handleAdd = (data: IEmployee) => {
        _setEmployeeList([...employeeList, data])
        toast('thêm mới thành công')
    }

    const handleDelete = (data: IEmployee) => {
        const indexDelete = employeeList.indexOf(data)
        const tempList = [...employeeList]
        tempList.splice(indexDelete, 1)
        _setEmployeeList(tempList)
        toast('đã xóa thành công')
    }

    const handleEdit = (data: IEmployee) => {
        setShowPage(PageEnum.edit)
        setDataEdit(data)
    }

    const handleUpdate = (data: IEmployee) => {
        const filterData = employeeList.filter(x => x.id === data.id)[0]
        const indexUpdate = employeeList.indexOf(filterData)
        const tempData = [...employeeList]
        tempData[indexUpdate] = data
        _setEmployeeList(tempData)
        toast('cập nhật thành công')
    }

    return (
        <>
            <article className='font-bold text-center'>
                <header>
                    <h1>Employees List</h1>
                </header>
            </article>
            <section className='mx-[10%] mt-[15px]'>
                {showPage === PageEnum.list && 
                    <>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5" type="button" onClick={addEmployee}>Add Employee</button>
                    <EmployeeList list={employeeList} btnDelete={handleDelete} btnEdit={handleEdit}/>
                    </>            
                }
                {showPage === PageEnum.add && <AddEmployee btnBack={showListPage} btnSubmit={handleAdd}/>}
                {showPage === PageEnum.edit && <EditEmployee data={dataEdit} btnBack={showListPage} btnUpdate={handleUpdate}/>}
            </section>
            <ToastContainer/>
        </>
    )
}

export default Home