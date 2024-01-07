import { Inter } from 'next/font/google'
import { Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Text, useToast } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import * as MdIcon from "react-icons/md"
import {IoMdEye, IoMdEyeOff} from "react-icons/io"
import { useContext, useState } from 'react'
import Image from 'next/image'
import { useMutation } from '@/hooks/useMutation'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LayoutAuth from '@/layout/auth'
import { UserContext } from '@/context/userContext'
const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [inputLogin, setInputLogin] = useState({
    email : "",
    password : ""
  })
  const {fetchingData} = useContext(UserContext)
  const {mutate} = useMutation()
  const toast = useToast()
  const route = useRouter()
  const handleChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;

      setInputLogin({ ...inputLogin, [name]: value });
  }

  const handleLogin = async (event) => {
      event.preventDefault()

      const response = await mutate({url : `/api/auth`, payload: inputLogin})

      if (!response?.success) {
          toast({
              title: 'Login failed',
              description: "There's something wrong. Check your email or password",
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: "top",
          })
      } else {
          Cookies.set('user_token', response?.data?.token, {expires : new Date(response?.data?.expires_at), path: '/'})
          fetchingData()
          route.push('/')
      }
  }
  return (
    <LayoutAuth metaTitle="Login" metaDescription='Whisper login page'>
      <div className='bg-background-purple bg-cover h-screen flex justify-center items-center'>
        <Card width='sm'>
          <CardHeader className='flex flex-col items-center gap-2'>
            <Image src="/whisperLogo.png" width={50} height={50} alt='peach'/>
            <Heading size='md'>Login</Heading>
            <Text>Welcome to whisper!</Text>
          </CardHeader>
          <CardBody>
            <Flex direction='column' gap={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={MdIcon.MdOutlineMail} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                </InputLeftElement>
                <Input onChange={handleChange} value={inputLogin.email} type='email' placeholder='Enter your email' variant='flushed' borderBottomColor='brand.purple' name='email'/>
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={MdIcon.MdOutlinePassword} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                </InputLeftElement>
                <Input
                  onChange={handleChange}
                  value={inputLogin.password}
                  pr='4.5rem'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password' variant='flushed' borderBottomColor='brand.purple' name='password'
                />
                <InputRightElement>
                  <Icon width='4.5rem' as={showPassword? IoMdEye : IoMdEyeOff} 
                  color={showPassword? 'brand.purple' : 'gray.300'} 
                  fontSize='1.2em'
                  cursor='pointer'
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(!showPassword)
                  }}
                  />
                </InputRightElement>
              </InputGroup>
              <Button bgColor='brand.purple' color='white' onClick={handleLogin}>
                Login
              </Button>
            </Flex>
            <Divider />
            <Text textAlign='center' mt={4}>Dont have an account? <Link href='/register' color='brand.purple'>Register</Link></Text>
          </CardBody>
        </Card>
      </div>
    </LayoutAuth>
  )
}
