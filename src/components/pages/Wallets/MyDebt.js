import '../../css/wallet.css'
import { Button, Text } from '@nextui-org/react'
import BorrowModal from '../../BorrowModal'
import LendModal from '../../LendModal'
import React from 'react'
import axios from 'axios'
import { getToken } from '../../../services/authorize'
import { useNavigate } from 'react-router-dom'
import { AlreadyIcon } from '../../userIcon/AlreadyIcon'

const MyDebt = () => {

  var [info,setInfo] = React.useState([])
  const [borrow,setBorrow] = React.useState()
  const [lend,setLend] = React.useState()
  const token = getToken()
  const navigate = useNavigate()

  const fetchData =()=>{
    axios.get(`${process.env.REACT_APP_API}/alldebtinfo`,{
      headers:{
        "Authorization":token
      }
    })
    .then(response=>{
      setBorrow(response.data.borrow_balance[0].balance)
      setLend(response.data.balance)
      setInfo(response.data.debt_list)
    }).catch(err=>alert(err))

  }
  React.useEffect(()=>{
    fetchData()// eslint-disable-next-line
  },[])

  const payBack=(_id,amount)=>{
    axios
    .put(
      `${process.env.REACT_APP_API}/payback`,
      {
        _id,
        amount
      },{
        headers:{
          'Authorization':token
          }
      }
    ).then(response=>{
    })
    .catch(err=>console.log(err))
    axios
        .put(
            `${process.env.REACT_APP_API}/outcome`,
            { amount, detail:`(คืนเงิน)` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            
        })
        .catch(err => {
            console.log("error");
        })

    navigate("/Debt")
    fetchData()
  }

  const receiveBack=(_id,amount)=>{
    axios
    .put(
      `${process.env.REACT_APP_API}/receiveback`,
      {
        _id,
        amount
      },{
        headers:{
          'Authorization':token
          }
      }
    ).then(response=>{
    })
    .catch(err=>console.log(err))
    axios
        .put(
            `${process.env.REACT_APP_API}/income`,
            { amount, detail:`(ได้รับเงินคืน)` },
            {
                headers:{
                'Authorization':token
                }
            }
        )
        .then(response => {
            
        })
        .catch(err => {
            console.log("error");
        })

    navigate("/Debt")
    fetchData()
  }


  return (
    <div className="wallet-content-page">
      <div className="wallet-content">
        <div className="mydebt-container">
          <div className="mydebt-area">
            <div className="debt-area-items">
              <div className="debt-balance">
                <div className="borrow-balance">
                  <p>จำนวนเงินที่ยืม</p>
                  <h2>{borrow}</h2>
                </div>
                <div className="lend-balance">
                  <p>จำนวนเงินที่ให้ยืม</p>
                  <h2>{lend}</h2>
                </div>
              </div>
              <div className="debt-button">
                <BorrowModal />
                <LendModal />
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
                  {
                  data.type && (
                    <Button className="check-button" color="success" auto rounded ghost onClick={()=>receiveBack(data._id,data.amount)}><AlreadyIcon /><span>ได้รับคืนแล้ว</span></Button>
                  )}
                  <span>ให้ {data.name} ยืมเงิน - {data.detail}</span>
                </div>
              )
            }
            {
              !(data.type) && (
                <div className="des-detail-list">
                  {
                    !(data.type) && (
                        <Button className="check-button" color="success" auto rounded ghost onClick={()=>payBack(data._id,data.amount)}><AlreadyIcon /><span>คืนเงินแล้ว</span></Button>
                    )
                  }
                  <span>ยืมเงินจาก {data.name} - {data.detail}</span>
                </div>
              )
            }
            <div className="amount-detail-list">
              <div className="amount-detail-lists">
                {
                  data.type && (
                    <div className="amount-detail">
                      <Text size="$xl" color="error">- {data.amount}</Text>
                    </div>
                  )
                }
                {
                  !(data.type) && (
                    <div className="amount-detail">
                      <Text size="$xl" color="success">+ {data.amount}</Text>
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

export default MyDebt