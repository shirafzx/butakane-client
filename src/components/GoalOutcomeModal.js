import React from 'react'
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { WalletIcon } from './userIcon/WalletIcon';
import { getToken } from '../services/authorize';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoalOutcomeModal = () => {

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

    const submitRemovePiggy = (e) =>{
        e.preventDefault()
        axios
        .put(`${process.env.REACT_APP_API}/removepiggy`,
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
            `${process.env.REACT_APP_API}/income`,
            { amount, detail:`แคะกระปุก` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            
            setState({ ...state, amount: "" })
            navigate("/Goal")
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
        <button className='goal-outcome' onClick={handler}>
            ถอนออก
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
                ถอนจากกระปุกออมสิน
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
            <Button auto onClick={submitRemovePiggy}>
                บันทึก
            </Button>
            </Modal.Footer>
        </Modal>
        </>
  )
}

export default GoalOutcomeModal