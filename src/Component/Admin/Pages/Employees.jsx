import axios from "axios"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { data, Navigate } from "react-router-dom"

let baseUrl = import.meta.env.VITE_BASE_URL;


export default function Employees() {

  let[empData, setEmpData]= useState({});
  let[openModal, setOpenModal]= useState(false);
  let[openEditModal,setOpenEditModal]= useState(false);
  let[empFormData,setEmpFormData]= useState([]);
  let[error,setError]= useState([]);
  let[filterData,setFilterData]=useState([{}]);
  let[editData,setEditData] =  useState([{}])
  let[isDelete, setIsDelete] = useState([{}])
  let[accountModalOpen, setAccountModalOpen]= useState(false);
  let[selectedEmpForAccount, setSelectedEmpForAccount]= useState(null);
  let[accountForm, setAccountForm]= useState({ email: '', role: 'employee', password: '', confirmPassword: ''});
  



  let handleChange =(e)=>{
      let {name, value} = e.target;
      setEmpData({...empData,[name] : value})
  }

  let formError = {}

  let validateForm = (empData) => {

    if (!empData.empId) {
      formError.empId = "ID is required";
    }

    if (!empData.empName) {
      formError.empName = "Name is required";
    }

    if (!empData.empEmail) {
      formError.empEmail ="Email is required";
    }

    if (!empData.empPhone) {
      formError.empPhone = "Phone number is required";
    }

    if (!empData.empAddress) {
      formError.empAddress = "Address is required";
    }

    if (!empData.empDateOfBirth) {
      formError.empDateOfBirth ="Date of birth is required";
    }

    if (!empData.empJoiningDate) {
      formError.empJoiningDate = "Joining date is required";
    }

    if (!empData.empDepartment) {
      formError.empDepartment = "Department is required";
    }

    if (!empData.empDesignation) {
      formError.empDesignation ="Designation is required";
    }

  else{

    axios .post(`${baseUrl}/post/employee`,empData)
          .then((res) => {
          let{success,message} = res.data

          if(success){
            alert(message)
            setOpenModal(false)
          }
          
        })
        .catch((err) => {
          console.error("API Error:", err.response?.data || err.message);
          let  {success,message} = err.response.data;
          if(success===false){
            alert(message)
          }
         
        });
  }
    setError(formError)
  };



  let handleClick = () =>{
    validateForm(empData);
  }

 

  let handleEditChange = (e) =>{
    let {name, value} = e.target
    setEditData({...filterData[0], [name]: value})
  }

  let handleAccountChange = (e) => {
    let { name, value } = e.target;
    setAccountForm({ ...accountForm, [name]: value });
  }

  console.log("account ", accountForm)

  let openAccountModal = (item) => {
    setSelectedEmpForAccount(item);
    setAccountForm({ name: item.empName || '', email: item.empEmail || '', role: 'employee', password: '', confirmPassword: '' });
    setAccountModalOpen(true);
  }

  let handleCreateAccount = () =>{
    if(!selectedEmpForAccount){
      alert('No employee selected');
      return;
    }

    // basic validation
    if(!accountForm.email){
      alert('Email is required');
      return;
    }

    if(!accountForm.role){
      alert('Role is required');
      return;
    }

    if(!accountForm.password){
      alert('Password is required');
      return;
    }

    if(accountForm.password !== accountForm.confirmPassword){
      alert('Passwords do not match');
      return;
    }


    
  

    axios.post(`${baseUrl}/signup`,accountForm) 
      .then((res)=>{
        let {success, message} = res.data;
        if(success){
          alert(message || 'Account created');
          setAccountModalOpen(false);
        }
      })
      .catch((err)=>{
        console.error('Account creation error:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Account creation failed');
      })
  }

    let handleEditClick = (_id) =>{
      
      let id = editData._id
      axios.put(`${baseUrl}/update/byid/${id}`,editData)
           .then((res)=> {
            let {success,message} = res.data;
            if(success) {
              alert(message)
              setOpenEditModal(false)
            }
         }).catch((err)=>{
            let {success, message} = err.response.data;
            if(success === false){
              alert(message)
            }
          })
  }

  useEffect(()=>{
    axios.get(`${baseUrl}/get/employee`).then((res)=>{

      let {success,message,data} = res.data;
      setEmpFormData(data)
    }).catch((err)=>{
      console.log(err.response.data)
          })
    },[empData, openModal, openEditModal, isDelete])

  console.log("Filtered data: ",editData)


  let handleDelete= (_id) =>{
    axios.delete(`${baseUrl}/delete/byid/${_id}`)
         .then((res) => {
            let {success, message} = res.data
            if(success){
              alert(message)
              setIsDelete(_id)
            }
          })
          .catch((err)=>{
            let {success, message} = err.response.data
            alert(message)
          })
  }
 

  return (
<>
        <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>

        <Dialog open={openModal} onOpenChange= {()=>{setOpenModal(true)}}>
        <div>
          <DialogTrigger asChild className="h-10 w-50 border-1 border-black rounded-2xl bg-blue-500 font-bold" >     
          <Button variant="outline">Add Employee</Button>
          </DialogTrigger>
          </div>
        </Dialog>


        <Dialog open={openModal} onOpenChange= {()=>{setOpenModal(true)}}>
        <DialogContent className="h-150 scroll-smooth overflow-scroll ">
          <DialogHeader>
            <DialogTitle>Employee Form</DialogTitle>
            
             
             
              <div>
                <label className="font-bold text-black">Emp ID</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee ID"
                className="w-full h-8 border-2 border-black rounded-2xl"
                name="empId"
                onChange={handleChange}
                >
                </input>
                <p>{error.empId}</p>
              </div>

              <div>
                <label className="font-bold text-black">Emp Name</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Name"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empName"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empName}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp Email</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Email"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empEmail"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empEmail}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp Phone</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee phone number"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empPhone"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empPhone}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp Address</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Address"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empAddress"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empAddress}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp Date of Birth</label>
              </div>
              <div className="mb-5">
                <input type="date" 
                placeholder="Enter the employee Date of Birth"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDateOfBirth"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empDateOfBirth}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp joining date</label>
              </div>
              <div className="mb-5">
                <input type="date" 
                placeholder="Enter the employee joining date"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empJoiningDate"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empJoiningDate}</p>
              </div>

                  <div>
                <label className="font-bold text-black">Emp Department</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Department"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDepartment"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empDepartment}</p>
              </div>

               <div>
                <label className="font-bold text-black">Emp Designation</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Designation"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDesignation"
                 onChange={handleChange}
                >
                </input>
                <p>{error.empDesignation}</p>
              </div>
          </DialogHeader>
          
          <DialogFooter>
              <Button variant="outline" className="h-10 w-25 border-2 bg-red-500 text-white font-bold rounded-2xl" onClick={()=>{setOpenModal(false)}}>Cancel</Button>
              <Button type="submit" className="h-10 w-25 border-2 bg-blue-500 text-white font-bold rounded-2xl" onClick={handleClick}>Save changes</Button>
          </DialogFooter>
        </DialogContent> 
        </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>


        {/* table content */}

          <table class="w-full border-collapse border border-gray-400 ...">
            <thead className="bg-blue-100">
              <tr>
                <th class="border border-gray-300 ...">Emp ID</th>
                <th class="border border-gray-300 ...">Emp Name</th>
                <th class="border border-gray-300 ...">Emp Email</th>
                <th class="border border-gray-300 ...">Emp Phone</th>
                <th class="border border-gray-300 ...">Emp Address</th>
                <th class="border border-gray-300 ...">Emp DOB</th>
                <th class="border border-gray-300 ...">Date of Joining</th>
                <th class="border border-gray-300 ...">Emp Department</th>
                <th class="border border-gray-300 ...">Emp Designation</th>
                <th class="border border-gray-300 ..."> Action</th>
              </tr>
            </thead>
            <tbody>
                     {empFormData.map((item)=>{
                return (
                
                       <tr>
                <td class="border border-gray-300 ...">{item.empId}</td>
                <td class="border border-gray-300 ...">{item.empName}</td>
                <td class="border border-gray-300 ...">{item.empEmail}</td>
                <td class="border border-gray-300 ...">{item.empPhone}</td>
                <td class="border border-gray-300 ...">{item.empAddress}</td>
                <td class="border border-gray-300 ...">{item.empDateOfBirth}</td>
                <td class="border border-gray-300 ...">{item.empJoiningDate}</td>
                <td class="border border-gray-300 ...">{item.empDepartment}</td>
                <td class="border border-gray-300 ...">{item.empDesignation}</td>
                <td class="border border-gray-300 ...">
                    <div className="flex gap-2">
                      <Button variant="outline" className="bg-green-500 text-white" onClick={()=>openAccountModal(item)}>Create Account</Button>

                      <Dialog 
                        open={openEditModal} 
                        onOpenChange= {()=>{
                          setOpenEditModal(true)
                          setFilterData(
                            empFormData.filter(
                              (data)=>data._id === item._id
                            ))
                        }}>
                        <div>
                          <DialogTrigger asChild className="h-8 w-25 border-1 border-black rounded-2xl bg-blue-400 font-bold">    
                            <Button variant="outline">Edit</Button>
                          </DialogTrigger>
                        </div>
                      </Dialog>

                      <button className="h-8 w-25 border-1 border-black rounded-2xl bg-red-400 font-bold" onClick={()=>handleDelete(item._id)}>Delete</button>
                    </div>
                </td>
              </tr>

                )
              })}
            </tbody>
          </table>

      </CardContent>
    </Card>

    {/* edit employee record dialog */}

        <Dialog open={openEditModal}>
        <DialogContent className="h-150 scroll-smooth overflow-scroll ">
          <DialogHeader>
            <DialogTitle>Edit Employee Form</DialogTitle>                         
              <div>
                <label className="font-bold text-black">Emp ID</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee ID"
                className="w-full h-8 border-2 border-black rounded-2xl"
                name="empId"
                defaultValue={filterData[0].empId}
                onChange={handleEditChange}
                >
                </input>
              </div>

              <div>
                <label className="font-bold text-black">Emp Name</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Name"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empName"
                 defaultValue={filterData[0].empName}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp Email</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Email"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empEmail"
                 defaultValue={filterData[0].empEmail}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp Phone</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee phone number"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empPhone"
                 defaultValue={filterData[0].empPhone}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp Address</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Address"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empAddress"
                 defaultValue={filterData[0].empAddress}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp Date of Birth</label>
              </div>
              <div className="mb-5">
                <input type="date" 
                placeholder="Enter the employee Date of Birth"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDateOfBirth"
                 defaultValue={filterData[0].empDateOfBirth}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp joining date</label>
              </div>
              <div className="mb-5">
                <input type="date" 
                placeholder="Enter the employee joining date"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empJoiningDate"
                 defaultValue={filterData[0].empJoiningDate}
                 onChange={handleEditChange}
                >
                </input>
              </div>

                  <div>
                <label className="font-bold text-black">Emp Department</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Department"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDepartment"
                 defaultValue={filterData[0].empDepartment}
                 onChange={handleEditChange}
                >
                </input>
              </div>

               <div>
                <label className="font-bold text-black">Emp Designation</label>
              </div>
              <div className="mb-5">
                <input type="text" 
                placeholder="Enter the employee Designation"
                className="w-full h-8 border-2 border-black rounded-2xl"
                 name="empDesignation"
                 defaultValue={filterData[0].empDesignation}
                 onChange={handleEditChange}
                >
                </input>
              </div>
          </DialogHeader>
          
          <DialogFooter>
              <Button variant="outline" className="h-10 w-25 border-2 bg-red-500 text-white font-bold rounded-2xl" onClick={()=>{setOpenEditModal(false)}}>Cancel</Button>
              <Button type="submit" className="h-10 w-25 border-2 bg-blue-500 text-white font-bold rounded-2xl" onClick={handleEditClick}>Save changes</Button>
          </DialogFooter>
        </DialogContent> 
        </Dialog>

        {/* create account dialog */}
        <Dialog open={accountModalOpen} onOpenChange={(val)=>setAccountModalOpen(val)}>
          <DialogContent className="h-80 scroll-smooth overflow-scroll ">
            <DialogHeader>
              <DialogTitle>Create Account for Employee</DialogTitle>
                <div>
                  <label className="font-bold text-black">Employee</label>
                </div>
                <div className="mb-3">
                  <input type="text" disabled value={selectedEmpForAccount?.empName || ''} className="w-full h-8 border-2 border-black rounded-2xl bg-gray-100" />
                </div>

                <div>
                  <label className="font-bold text-black">Email</label>
                </div>
                <div className="mb-3">
                  <input type="email" name="email" value={accountForm.email} onChange={handleAccountChange} placeholder="Email" className="w-full h-8 border-2 border-black rounded-2xl" />
                </div>

                <div>
                  <label className="font-bold text-black">Role</label>
                </div>
                <div className="mb-3">
                  <select name="role" value={accountForm.role} onChange={handleAccountChange} className="w-full h-8 border-2 border-black rounded-2xl">
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black">Password</label>
                </div>
                <div className="mb-3">
                  <input type="password" name="password" value={accountForm.password} onChange={handleAccountChange} placeholder="Password" className="w-full h-8 border-2 border-black rounded-2xl" />
                </div>

                <div>
                  <label className="font-bold text-black">Confirm Password</label>
                </div>
                <div className="mb-3">
                  <input type="password" name="confirmPassword" value={accountForm.confirmPassword} onChange={handleAccountChange} placeholder="Confirm Password" className="w-full h-8 border-2 border-black rounded-2xl" />
                </div>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" className="h-10 w-25 border-2 bg-red-500 text-white font-bold rounded-2xl" onClick={()=>{setAccountModalOpen(false)}}>Cancel</Button>
              <Button type="button" className="h-10 w-25 border-2 bg-blue-500 text-white font-bold rounded-2xl" onClick={handleCreateAccount}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

</>
    
  )
}