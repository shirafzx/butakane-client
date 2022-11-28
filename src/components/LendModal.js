import React from 'react'
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { WalletIcon } from './userIcon/WalletIcon';
import { DetailsIcon } from "./userIcon/DetailsIcon"
import { UserIcon } from './userIcon/UserIcon';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authorize';
import axios from 'axios';

const LendModal = () => {

    const [state,setState] = React.useState({
        name:"",
        amount:"",
        detail:""
    })
    const navigate = useNavigate()
    const {name,amount,detail} = state

    // put value to state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }

    const token = getToken()
    const submitLend = (e) => {
        axios
        .post(
            `${process.env.REACT_APP_API}/lend`,
            { name, amount, detail },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            setVisible(false);
            console.log("closed");
            
        })
        .catch(err => {
            console.log("error");
        })
        axios
        .put(
            `${process.env.REACT_APP_API}/outcome`,
            { amount, detail:`${detail} (ให้ยืม)` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            setState({ ...state, name:"", amount: "", detail: "" })
            navigate("/Debt")
        })
        .catch(err => {
            console.log("error");
        })
    }

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

  return (
    <>
        <button className="lend-button" onClick={handler}>
            ให้ยืม
        </button>
        <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
            <Text id="modal-title" size={18}>
                ให้ยืมเงิน
            </Text>
            </Modal.Header>
            <Modal.Body>
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="จำนวน"
                value={amount}
                onChange={inputValue("amount")}
                contentLeft={<WalletIcon fill="currentColor" />}
            />
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="ผู้ยืม"
                value={name}
                onChange={inputValue("name")}
                contentLeft={<UserIcon fill="currentColor" />}
            />
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="รายละเอียด"
                value={detail}
                onChange={inputValue("detail")}
                contentLeft={<DetailsIcon fill="currentColor" />}
            />
            </Modal.Body>
            <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
            <Button auto onClick={submitLend}>
                บันทึก
            </Button>
            </Modal.Footer>
        </Modal>
        </>
  )
}

export default LendModal