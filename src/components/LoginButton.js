import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Loading, Spacer } from "@nextui-org/react";
import { UserIcon } from "./userIcon/UserIcon";
import { Password } from "./userIcon/Password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authenticate, localAuthenticate } from "../services/authorize";


const LoginButton = () => {

  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const closeHandler2 = () => {
    setVisible2(false);
    setVisible1(false)
    console.log("closed");
  };


  const [state, setState] = React.useState({
    username: "",
    password: ""
  })

  const [checked, setChecked] = React.useState(false); 
  const handleChange = () => { 
    
    setChecked(!checked); 
    console.log({checked});
  }; 

  const navigate = useNavigate()
  const { username, password } = state
  const inputValue = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const submitLogin = (e) => {
    
    e.preventDefault()
    if(username && password){
      setVisible1(true)
    }
    axios
    .post(`${process.env.REACT_APP_API}/login`,{ username, password })
    
    .then(response => {
      setVisible1(true)
      if(checked===true){     
        localAuthenticate(response,()=>navigate("/Wallet"))
      }else{
        authenticate(response,()=>navigate("/Wallet"))
      }
      
      setVisible(false);
      console.log(response);

      setState({ ...state, username: "", password: "" })
    })
    // setHide("nothide")
    .catch(err => {
      setVisible2(true)
      console.log("error");
    })

  }
  
  

  return (
    <div>
      <Button auto flat color="success" onClick={handler}>
        ลงชื่อเข้าใช้
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
              ชื่อผู้ใช้หรือรหัสผ่านผิด
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
            Welcome to <Text b size={18}>Butakane!</Text>
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
          <Row justify="space-between">
            <Checkbox onChange={handleChange}>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            {/* <Text size={14}>Forgot password?</Text> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={submitLogin}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginButton