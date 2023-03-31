import Link from 'next/link'

import { Container, TextInput, Button } from '@mantine/core'
import { Input } from 'antd';
import Image from 'next/image'
import login from '../assets/images/login.png'
import logo from '../assets/images/logo.png'
import pocket from '../assets/images/pocket.png'

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}
export const VerifyPassword: React.FC = () => {
  return (
    <Container className='pockets_main'>
        <div className="pockets_login">
      <div>
        <Image loader={sanityIoImageLoader} alt="image" src={login} style={{width:"100%"}} ></Image>
      </div>
      <div className='pocket_main_header'>
        <div style={{textAlign: "center", marginTop: "42px"}}>
        <Image loader={sanityIoImageLoader} alt="image" src={logo} style={{width:"8%"}}></Image><br/>
        <Image loader={sanityIoImageLoader} alt="image" src={pocket}></Image>
        </div>
        <div>
            <h2 className='pockets_forgot_password_header'>Check Your Email</h2>
            <p className='pockets_para'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div>
        <p>Enter OTP</p>
        <div>
        <Input size="small"  className='pockets_otp_input'/>
        <Input size="small"  className='pockets_otp_inputt'/>
        <Input size="small"  className='pockets_otp_inputt'/>
        <Input size="small"  className='pockets_otp_inputt'/>
        </div>
         <a href='/newPassword'><Button type="submit" className='pockets_otp_button'>Verify</Button></a>
        </div>
      </div>
      </div>
    </Container>
  )
}

export default VerifyPassword
