import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGlobe, FaHouseUser, FaLock, FaQuestion, FaSignOutAlt } from 'react-icons/fa'

import { Group, MantineColor, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { useAuthenticated, useSignOut, useUserData } from '@nhost/nextjs';
import Image from 'next/image'
import dashboard from '../../public/dashboard.svg'
import favcharity from '../../public/charity.svg'
import project from '../../public/project.svg'
import user from '../../public/user.svg'
import post from "../../public/post.svg"
import wallet from "../../public/wallet.svg"
import inbox from "../../public/inbox.svg"
import search from "../../public/search.svg"
import noti from "../../public/notify.svg"
import whitelogo from "../../public/Pockets logo1.svg"
import setting from "../../public/setting-3.svg";
import ticket_navbar from "../../public/ticket_navbar.svg";



const MenuItem: React.FC<any> = ({ icon, color, label, link, role, action }) => {
  const { route } = useRouter();
  const user = useUserData();

  const active = route === link
  const Button = (
    <UnstyledButton
      onClick={action}

      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: active
          ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7]
          : theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="outline">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )

  let authorized = true;
  if (role === 'admin') {
    authorized = user?.defaultRole === 'admin' ? true : false
    console.log('adminauthorized', user?.roles?.includes('admin'), user?.roles, authorized, role, link)
  } else if (role === 'ngo') {
    console.log('authorized', user?.roles?.includes('ngo'))
    authorized = user?.defaultRole === 'ngo' ? true : false
    console.log('authorized', authorized)
  } else if (role === 'all') {
    authorized = true
  } else {
    authorized = false
  }

  console.log('authorized', authorized, role, link)

  return link && authorized ? (
    <Link className={route === link ? "active" : ""} href={link} passHref>
      <div className='activeCover'>
        <span></span>
      </div>
      {Button}
    </Link>
  ) : (
    <></>
  )
}
const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}
const data: any[] = [
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={dashboard} />, label: 'Dashboard', role: 'admin', link: '/admindashboard' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={dashboard} />, label: 'Dashboard', role: 'ngo', link: '/dashboard' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={favcharity} />, label: 'Charity', role: 'admin', link: '/charity' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={project} />, label: 'Project', role: 'all', link: '/project' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={post} />, label: 'Post', role: 'all', link: '/post' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={user} />, label: 'User', role: 'admin', link: '/user' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={wallet} />, label: 'Wallet', role: 'admin', link: '/adminwallet' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={wallet} />, label: 'Wallet', role: 'ngo', link: '/ngowallet' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={inbox} />, label: 'inbox', role: 'admin', link: '/inbox/inbox' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={ticket_navbar} />, label: 'Ticket', role: 'ngo', link: '/Tickets' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={search} />, label: 'Search', role: 'all', link: '/search' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={setting} />, label: 'Setting', role: 'all', link: '/ngosetting/ngosetting' },
  { icon: <Image loader={sanityIoImageLoader} alt="image" src={noti} />, label: '', role: 'all', link: '/Profile' },


]

export default function NavBar() {
  const authenticated = useAuthenticated()
  const { signOut } = useSignOut()
  const router = useRouter()
  const links = data.map((link) => <MenuItem {...link} key={link.label} />)
  return (
    <div className='navbar'>
      <Navbar width={{ sm: 100, lg: 100, base: 100 }}>
        <div>
          <ul className='logo_sidebar'>
            <li> <Image loader={sanityIoImageLoader} alt="image" src={whitelogo} /></li>

          </ul>
        </div>
        <div className='menu_list'>
          {links}
          {authenticated && (
            <a className=""
              onClick={async () => {
                await signOut()
                localStorage.removeItem('auth')
                router.replace('/')
              }}>
              <div className="activeCover">
                <span></span>
              </div>
              <button className="mantine-UnstyledButton-root mantine-slbzcy logout_btn" type="button">
                <div className="mantine-Group-root mantine-6y1794">
                  <div className="mantine-ThemeIcon-root mantine-Group-child mantine-17rws8j">
                    <FaSignOutAlt />
                  </div>
                  <div className="mantine-Text-root mantine-Group-child mantine-ify7dg">Logout</div>
                </div>
              </button>
            </a>

            // <MenuItem
            //   icon={<FaSignOutAlt />}
            //   label="Sign Out"
            //   role="all"
            //   action={async () => {
            //     await signOut()
            //     localStorage.removeItem('auth')
            //     router.replace('/')
            //   }}
            // />
          )}
        </div>
        <div>
          <ul className='navbar_list'>
            {/* <li><Image loader={sanityIoImageLoader} alt="image" src="/profile.png"/></li>
          <li><Image loader={sanityIoImageLoader} alt="image" src="/setting.png"/></li>
          <li><Image loader={sanityIoImageLoader} alt="image" src="/help.png"/></li> */}
          </ul>
        </div>
      </Navbar>
    </div>
  )
}
