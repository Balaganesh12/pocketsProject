import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NotificationBar from '../pages/NotificationBar/NotificationBar'
import NavBar from './NavBar'
import { useUserData } from '@nhost/nextjs'
import Image from 'next/image'
import maximize from './../assets/images/rightsidearrow.svg'
import leftsidearrow from "../assets/images/leftsidearrow.svg"
import backside_arrow from "../../assets/images/rightsidearrow.svg";

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}


export function authProtected(Comp) {
  return function AuthProtected(props) {
    const user = useUserData();
    console.log(user, 'user')
    const router = useRouter()

    const { isLoading, isAuthenticated } = useAuthenticationStatus();
    const [notificationstatus, setNotificationstatus] = useState(true);




    const onNoticationClick = () => {
      setNotificationstatus(!notificationstatus)
    }

    useEffect(() => {
      if (isLoading || isAuthenticated) {
        return
      }
      router.push('/login')
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
      return <div>Loading...</div>
    }
    return <>

      <div className={notificationstatus ? 'notificationVisible pockets_container' : 'notificationHide pockets_container'}>
      <Image onClick={onNoticationClick} className={notificationstatus ? "sideBarIcon" : "sideBarIconHide"} loader={sanityIoImageLoader} alt="image" src={maximize} />
      <Image onClick={onNoticationClick} className={notificationstatus ? "sideBarIconLeft" : "sideBarIconLeftHide"} loader={sanityIoImageLoader} alt="image" src={leftsidearrow} />

      
        <NavBar />
        <div className="mainContent">
          <Comp {...props} />
        </div>
        <NotificationBar />
      </div>


    </>
  }
}
