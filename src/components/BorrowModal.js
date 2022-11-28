import React from 'react'
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { WalletIcon } from './userIcon/WalletIcon';
import { DetailsIcon } from "./userIcon/DetailsIcon"
import { UserIcon } from './userIcon/UserIcon';
import { getToken } from '../services/authorize';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BorrowModal = () => {

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
    const submitBorrow = (e) => {
        axios
        .post(
            `${process.env.REACT_APP_API}/borrow`,
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
            `${process.env.REACT_APP_API}/income`,
            { amount, detail:`${detail} (ยืมเงิน)` },
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
        <button className="borrow-button" onClick={handler}>
            ขอยืม
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
                ยืมเงิน
            </Text>
            </Modal.Header>
            <Modal.Body>
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={amount}
                onChange={inputValue("amount")}
                placeholder="จำนวน"
                contentLeft={<WalletIcon fill="currentColor" />}
            />
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={name}
                onChange={inputValue("name")}
                placeholder="ผู้ให้ยืม"
                contentLeft={<UserIcon fill="currentColor" />}
            />
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                value={detail}
                onChange={inputValue("detail")}
                placeholder="รายละเอียด"
                contentLeft={<DetailsIcon fill="currentColor" />}
            />
            </Modal.Body>
            <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
            <Button auto onClick={submitBorrow}>
                บันทึก
            </Button>
            </Modal.Footer>
        </Modal>
        </>
  )
}

export default BorrowModal