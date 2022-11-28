import '../css/page.css'
import '../css/home.css'
import AnimatedPage from '../AnimatedPage'
import HomeIMG from '../assets/home.png'
import { Button } from '@nextui-org/react'
import { Modal, Text } from '@nextui-org/react'
import React from 'react'
import RegButton from '../RegButton'
import LoginButton from '../LoginButton'
import MovingText from 'react-moving-text'

const MyAnimatedTypo = () => {
  return (
    <MovingText type="typewriter"
    dataText={[
    'สุดยอดโปรแกรมบัญชีรายรับรายจ่าย',
    'ช่วยจัดระเบียบให้กับชีวิตคุณ',
    'พร้อมให้บริการแล้ววันนี้'
    ]} />)
   }

const Home = () => {

  const [visible2, setVisible2] = React.useState(false);
  const handler2 = () => setVisible2(true);
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  return (
    <AnimatedPage>
      <div className="wrapper">
        <div className="container">
          <div className="Home-box">
            <div className="Home-left-box">
              <div className="far-left-box">
                
                <h1>รู้หมือไร่ว่า <span className='blue-text'>Butakane</span> คืออะไร?</h1>
                <h2><MyAnimatedTypo /></h2>
                <p className="op-50-text">Butakane คือ แอพพลิเคชั่นบันทึกบัญชีรายรับรายจ่ายที่ทำงานบนเว็บไซต์สำหรับพร้อมใช้งานได้ทุกเมื่อ ทุกที่ ทุกเวลา ก็พร้อมจะให้คุณได้ใช้ชีวิตที่มีระเบียบในการจัดการเงินของคุณบนแพลตฟอร์มออนไลน์ </p>
                <div className="Home-button-box">
                    <Modal
                      closeButton
                      blur
                      aria-labelledby="modal-title"
                      open={visible2}
                      onClose={closeHandler2}
                      // open
                    >
                      <Modal.Header>
                        <Text id="modal-title" size={18}>
                            ลงชื่อเข้าใช้
                        </Text>
                      </Modal.Header>
                      <Modal.Footer justify='center'>
                        <LoginButton />
                        <RegButton />
                      </Modal.Footer>
                    </Modal>
                    <Button shadow color="gradient" onClick={handler2}>
                      ลองใช้เลย !
                    </Button>
                </div>
              </div>
            </div>
            <div className="Home-right-box">
              <img src={HomeIMG} alt="KAF" />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Home