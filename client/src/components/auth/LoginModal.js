
import React,{useState} from 'react'
import { NavLink,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from "reactstrap"

function LoginModal() {
    const [modal,setModal]=useState(false)
    const toggle=()=>{
        setModal(!modal)
    }
  return (
    <div> <NavLink  onClick={toggle} href="#">Login</NavLink>
    <Modal isOpen={modal}>
<ModalHeader toggle={toggle}>
Register
</ModalHeader>
<ModalBody>
<Form>
   <FormGroup>
      
        <Label>Email</Label>
       <Input 
       type="email"
       name="email"
       className='mb-3'/>
        <Label>Password</Label>
       <Input 
       type="password"
       name="password"
       className='mb-3'/>
   </FormGroup>
</Form>
</ModalBody>
    </Modal>
</div>
  )
}

export default LoginModal