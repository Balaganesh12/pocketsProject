import type { NextPage } from 'next'
import { useState } from 'react'

import { Button, Container, Input, Title } from '@mantine/core'
import {
  useAccessToken,
  useAuthenticated,
  useChangeEmail,
  useChangePassword,
  useSignOut
} from '@nhost/nextjs'
import { useAuthQuery } from '@nhost/react-apollo'

import { authProtected } from '../components/protected-route'
// import { BOOKS_QUERY } from '../helpers'
import Login from './login'

// * Reference: https://blog.codepen.io/2021/09/01/331-next-js-apollo-server-side-rendering-ssr/

const Home: NextPage = () => {
  const isAuthenticated = useAuthenticated()
  const [email] = useState('')
  const [password] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const accessToken = useAccessToken()
  const { signOut } = useSignOut()
  const { changeEmail, ...changeEmailResult } = useChangeEmail()
  const { changePassword, ...changePasswordResult } = useChangePassword()
  // const { loading, data, error } = useAuthQuery(BOOKS_QUERY)
  return (
    <>
      {isAuthenticated ? (
        <></>
      ) : (
        <>
          <Container> <Login /></Container>
        </>
      )}
    </>
  )
}

export default authProtected(Home)
