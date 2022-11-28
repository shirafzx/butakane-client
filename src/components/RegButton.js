import React, { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Loading, Spacer } from "@nextui-org/react";
import { UserIcon } from "./userIcon/UserIcon";
import { Password } from "./userIcon/Password";
import axios from 'axios'
import { authenticate,localAuthenticate } from '../services/authorize'

import { useNavigate } from "react-router-dom";

const RegButton = () => {

  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const closeHandler2 = () => {
    setVisible2(false);
    setVisible1(false)
    console.log("closed");
  };


  const [checked, setChecked] = useState(false); 
  const handleChange = () => { 
    
    setChecked(!checked); 
    console.log({checked});
  }; 

  const navigate = useNavigate()
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPass: ""
  })

  const {username,password,confirmPass} = state

  // put value to state
  const inputValue = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  const submitReg = (e) => {
    e.preventDefault()
    if(username && password){
      setVisible1(true)
    }
    axios
        .post(`${process.env.REACT_APP_API}/reg`, { username, password, confirmPass })
        .then(response => {
          axios
            .post(`${process.env.REACT_APP_API}/login`,{ username, password })
            .then(response => {
              if(checked===true){
                localAuthenticate(response,()=>navigate("/Wallet"))
              }else{
                authenticate(response,()=>navigate("/Wallet"))
              }

              setVisible(false);
              console.log("closed");

              setState({ ...state, username: "", password: "", confirmPass: "" })
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          setVisible2(true)
          console.log(err);
        })
    
    
  }

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Button auto color="gradient" onClick={handler}>
        สมัครสมาชิก
      </Button>

      {/* Loading */}
      <Modal
        blur
        aria-labelledby="modal-title"
        open={visible1}
        preventClose
        // open
      >
        <Modal.Header>
        <Loading type="spinner" size="lg" color="secondary" />
        <Spacer x={0.5} />
        <Text id="modal-title" size={18}>
            กำลังเชื่อมต่อ
          </Text>
        </Modal.Header>
      </Modal>
      {/* Loading */}
      {/* Fail to Connect */}
      <Modal
        blur
        aria-labelledby="modal-title"
        open={visible2}
        preventClose
        // open
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
              ชื่อผู้ใช้ซ้ำหรือรหัสผ่านไม่ตรงกัน
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Button auto color="warning" shadow onClick={closeHandler2}>
              ตกลง
          </Button>
        </Modal.Body>
      </Modal>
      {/* Fail to Connect */}

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
           สมัครสมาชิก
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={inputValue("username")}
            contentLeft={<UserIcon fill="currentColor" />}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={inputValue("password")}
            contentLeft={<Password fill="currentColor" />}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPass}
            onChange={inputValue("confirmPass")}
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox onChange={handleChange}>
              <Text size={14}>จำฉันไว้</Text>
            </Checkbox>
            {/* <Text size={14}>ลืมรหัสผ่าน?</Text> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            ยกเลิก
          </Button>
          <Button auto onClick={submitReg}>
            สมัคร
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegButton