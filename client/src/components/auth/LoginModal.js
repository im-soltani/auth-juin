
import React,{useState} from 'react'
import { NavLink,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from "reactstrap"
import { loginUser } from '../../redux/actions/authActions'
import {useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom';

function LoginModal() {
    const [modal,setModal]=useState(false)
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const toggle=()=>{
        setModal(!modal)
    }
const dispatch=useDispatch()
const navigate=useNavigate()
const handleLogin=()=>{
dispatch(loginUser({email,password}))
/*navigate("/dashboard")*/
toggle()
}
  return (
    <div> <NavLink  onClick={toggle} href="#">Login</NavLink>
    <Modal isOpen={modal}>
<ModalHeader toggle={toggle}>
Login
</ModalHeader>
<ModalBody>
<Form>
   <FormGroup>
      
        <Label>Email</Label>
       <Input 
       type="email"
       name="email"
       className='mb-3'
       onChange={(e)=>setEmail(e.target.value)}/>
        <Label>Password</Label>
       <Input 
       type="password"
       name="password"
       className='mb-3'
       onChange={(e)=>setPassword(e.target.value)}/>
   </FormGroup>
   <Button onClick={handleLogin}>Login</Button>
</Form>
</ModalBody>
    </Modal>
</div>
  )
}

export default LoginModal