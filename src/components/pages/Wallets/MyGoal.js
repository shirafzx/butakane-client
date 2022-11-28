import '../../css/wallet.css'
import { Input, Modal, Progress, Text, Button } from "@nextui-org/react";
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../services/authorize';
import GoalIncomeModal from '../../GoalIncomeModal';
import GoalOutcomeModal from '../../GoalOutcomeModal';


const MyGoal = () => {

  const [visible2, setVisible2] = React.useState(false);
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };


  const [state,setState] = useState({
    item:"",
    price:"",
    url:""
  })

  const [info,setInfo] = useState({
    item:"",
    price:"",
    piggy:"",
    url:""
  })

  const token = getToken()
  const {item,price,url} = state
  // const itemInfo = info.item
  // const priceInfo = info.price
  // const piggyInfo = info.piggy
  // const urlInfo = info.url

  // put value to state
  const inputValue = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  const fetchData = ()=>{
    axios.get(`${process.env.REACT_APP_API}/goalinfo`,{
      headers:{
        "Authorization":token
      }
    })
    .then(response=>{
      setState(response.data[0])
      setInfo(response.data[0])
    }).catch(err=>alert(err))
    
  }

  const submitGoal = (e) => {
    setVisible2(true)
    e.preventDefault()
    axios
    .put(`${process.env.REACT_APP_API}/savegoal`,
    {item,price,url},
    {
      headers:{
        'Authorization':token
      }
    })
    .then(response=>{
      fetchData()
    })

  }

  React.useEffect(()=>{
    fetchData()// eslint-disable-next-line
  },[])

  const submitReachedGoal = () =>{
    if(info.piggy===info.price){
      axios
      .put(`${process.env.REACT_APP_API}/reachedgoal`,
      {},
      {
        headers:{
          'Authorization':token
        }
      }).then(response=>{
        fetchData()
      })
    }
    if(info.piggy>info.price){
      var amount = parseInt(info.piggy) - parseInt(info.price)
      axios
        .put(
            `${process.env.REACT_APP_API}/income`,
            { amount, detail:`เงินทอนจากเป้าหมาย` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
          fetchData()
        })
        .catch(err => {
            console.log("error");
        })
      axios
      .put(`${process.env.REACT_APP_API}/reachedgoal`,
      {},
      {
        headers:{
          'Authorization':token
        }
      }).then(response=>{
        fetchData()
      })
    }
    

  }


  return (
    <div className="wallet-content-page">
      <div className="wallet-content">
        <div className="mygoal-container">
          <div className="mygoal-area">
            <div className="goal-area-items">
              <div className="goal-header"><h2>เป้าหมายของคุณ !</h2></div>
              <div className="goal-info">
                <Input className='goal-input' value={item} onChange={inputValue("item")} clearable placeholder="เป้าหมาย" initialValue={item} status="default" width='80%' />
                <div className="goal-img">
                  <img src={url} alt="" />
                </div>
                <Input className='goal-input' value={url} onChange={inputValue("url")} clearable placeholder="url" initialValue={url} status="default" width='80%' />
                <h3>สะสมได้ <span>{info.piggy}</span> จาก <span>{info.price}</span> </h3>
                <div className="goal-progress">
                  <Progress shadow value={parseInt(info.piggy)} max={parseInt(info.price)} />
                </div>
                <Input className='goal-input' value={price} onChange={inputValue("price")} clearable placeholder="ราคา" initialValue={price} status="default" width='80%' />


                <Modal
                  blur
                  aria-labelledby="modal-title"
                  open={visible2}
                  preventClose
                  // open
                >
                  <Modal.Header>
                    <Text id="modal-title" size={18}>
                        บันทึกเสร็จสิ้น
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Button auto color="primary" onClick={closeHandler2}>
                        ตกลง
                    </Button>
                  </Modal.Body>
                </Modal>  
                <button className='goal-save' onClick={submitGoal}>บันทึกข้อมูล</button>
                <GoalIncomeModal/>
                <GoalOutcomeModal />
                {/* <button className='goal-income'>ฝากเพิ่ม</button> */}
                <button className='goal-reset' onClick={submitReachedGoal}>ทำตามเป้าหมายสำเร็จแล้ว</button>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyGoal