import React from 'react'
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { WalletIcon } from './userIcon/WalletIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authorize';

const GoalIncomeModal = () => {

    const [state,setState] = React.useState({
        amount:"" 
    })
    

    const token = getToken()
    const {amount} = state
    const navigate = useNavigate()
    // put value to state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }

    const submitAddPiggy = (e) =>{
        e.preventDefault()
        axios
        .put(`${process.env.REACT_APP_API}/addpiggy`,
        {amount},
        {
        headers:{
            'Authorization':token
        }
        }).then(response=>{
            
        }).catch(err => {
            console.log("error");
        })
        axios
        .put(
            `${process.env.REACT_APP_API}/outcome`,
            { amount, detail:`ออมเงิน` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            navigate("/Goal")
            setState({ ...state, amount: "" })
            
        })
        .catch(err => {
            console.log("error");
        })
        setVisible(false);
        console.log("closed");
        
    }

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

  return (
    <>
        <button className='goal-income' onClick={handler}>
            ฝากเพิ่ม
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
                ฝากเข้ากระปุกออมสิน
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
            </Modal.Body>
            <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
            <Button auto onClick={submitAddPiggy}>
                บันทึก
            </Button>
            </Modal.Footer>
        </Modal>
        </>
  )
}

export default GoalIncomeModal