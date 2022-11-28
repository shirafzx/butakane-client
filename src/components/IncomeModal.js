import React from 'react'
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { WalletIcon } from './userIcon/WalletIcon';
import { DetailsIcon } from "./userIcon/DetailsIcon"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../services/authorize';

const IncomeModal = () => {

    const navigate = useNavigate()
    const [state, setState] = React.useState({
        amount:"",
        detail:""
    })

    const { amount, detail } = state

    // put value to state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }
    
    const token = getToken()
    const submitIncome = (e) => {
        axios
        .put(
            `${process.env.REACT_APP_API}/income`,
            { amount, detail },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            setVisible(false);
            console.log("closed");
            
            setState({ ...state, amount: "", detail: "" })
            navigate("/Wallet")
        })
        .catch(err => {
            console.log("error");
        })
        console.log("testssdfsdf");
    }

    
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

  return (
    <div>
        <button className="item-wallet-income" onClick={handler}>
            <span>
                รายรับ
            </span>
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
                รายรับ
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
            <Button auto onClick={submitIncome}>
                บันทึก
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
  )
}

export default IncomeModal