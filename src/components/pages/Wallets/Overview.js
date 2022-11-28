import React from 'react';
import '../../css/wallet.css'
import { Progress, Text } from "@nextui-org/react";
import { getToken } from '../../../services/authorize';
import IncomeModal from '../../IncomeModal';
import OutcomeModal from '../../OutcomeModal';
import Neko from '../../assets/neko_tsukareta2.png'
import axios from 'axios';

const Overview = () => {

  var [info,setInfo] = React.useState([])

  const [wallet,setWallet] = React.useState([])
  const [goal,setGoal] = React.useState({})
  const [incomeSum,setIncomeSum] = React.useState()
  const [outcomeSum,setOutcomeSum] = React.useState()
  const token = getToken()
  const fetchData = ()=>{

    axios
    .get(`${process.env.REACT_APP_API}/alloverviewinfo`,
    {
      headers:{
        'Authorization':token
        }
    })
    .then(response=>{
      setWallet(response.data.balance)
      setInfo(response.data.in_out_list)
      setGoal(response.data.goal_data[0])
    })
    .catch(err=>alert(err))

    
    axios.get(`${process.env.REACT_APP_API}/incomesum`,{
      headers:{
        "Authorization":token
      }
    })
    .then(response=>{
      setIncomeSum(response.data)
    }).catch(err=>alert(err))

    axios.get(`${process.env.REACT_APP_API}/outcomesum`,{
      headers:{
        "Authorization":token
      }
    })
    .then(response=>{
      setOutcomeSum(response.data)
    }).catch(err=>alert(err))
    

  }
    

    // const incomeSum = incomeArr.reduce((a,b)=>a+b)
    // const outcomeSum = outcomeArr.reduce((a,b)=>a+b)
    
  
  React.useEffect(()=>{
    
    fetchData()// eslint-disable-next-line
  },[])

  const walletBalance = wallet;

  return (
    <div className="wallet-content-page">
      <div className="wallet-content">
          <div className="overview-area">
            <div className="overview-area-items">
              <div className="overview-area-item-1">
                <div className="item-balance">
                  <span>กระเป๋าเงิน - ยอดรวม</span>
                  <h2>{walletBalance}</h2>
                </div>
                <div className="items-wallet-action">
                  <div className="items-wallet-action-left">
                    {/* <button className="item-wallet-income"></button> */}
                    <IncomeModal />
                    <OutcomeModal />
                    {/* <button className="item-wallet-outcome"></button> */}
                  </div>
                  <div className="item-sticker">
                    <img src={Neko} alt="Neko" />
                  </div>
                </div>
              </div>
              <div className="overview-area-item-2">
                <div className="ow-mygoal-area">
                  <div className="ow-mygoal-header">
                    <h3>เป้าหมายของฉัน</h3>
                    <h4>{goal.item}</h4>
                  </div>
                  <div className="ow-mygoal-img">
                    <img src={goal.url} alt="" />
                  </div>
                  <div className="ow-mygoal-progress">
                    <h6>สะสมได้ <span>{goal.piggy}</span> จาก <span>{goal.price}</span> </h6>
                    <Progress shadow value={parseInt(goal.piggy)} max={parseInt(goal.price)} />
                  </div>
                </div>
              </div>
              <div className="overview-area-item-3">
                <div className="ow-today-area">
                  <div className="ow-today-items">
                    <div className="ow-today-header"><h3>สรุปวันนี้</h3></div>
                    <div className="ow-today-card-items">
                      <div className="ow-today-badge">รายรับ</div>
                      
                      <div className="ow-today-item"><span>{incomeSum}</span></div>
                    </div>
                    <div className="ow-today-card-items">
                      <div className="ow-today-badge">รายจ่าย</div>
                      <div className="ow-today-item"><span>{outcomeSum}</span></div>
                    </div>
                    <div className="ow-today-card-items">
                      <div className="ow-today-badge">ผลรวม</div>
                      <div className="ow-today-item"><span>{incomeSum-outcomeSum}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-title">
            <span>รายการ</span>
          </div>
        {info.slice(0).reverse().map((data,index)=>(
          <div className="detail-lists" key={index}>
            {
              data.type && (
                <div className="des-detail-list">
                  <span>รายรับ - {data.detail}</span>
                </div>
              )
            }
            {
              !(data.type) && (
                <div className="des-detail-list">
                  <span>รายจ่าย - {data.detail}</span>
                </div>
              )
            }
            <div className="amount-detail-list">
              <div className="amount-detail-lists">
                {
                  data.type && (
                    <div className="amount-detail">
                      <Text size="$xl" color="success">+ {data.amount}</Text>
                    </div>
                  )
                }
                {
                  !(data.type) && (
                    <div className="amount-detail">
                      <Text size="$xl" color="error">- {data.amount}</Text>
                    </div>
                  )
                }
                
                <div className="timestamp-detail">
                  <Text>{new Date(data.createdAt).toLocaleString()}</Text>
                </div>
              </div>
            </div>
          </div>
        ))}
          
      </div>
    </div>
  )
}

export default Overview