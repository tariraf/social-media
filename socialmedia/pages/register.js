import Image from 'next/image';
import { Inter } from 'next/font/google';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import * as MdIcon from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';
import { BiSolidBookHeart } from 'react-icons/bi';
import LayoutAuth from '@/layout/auth';
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
    hobby: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {mutate} = useMutation()
  const route = useRouter()
  const toast = useToast()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await mutate({url: '/api/auth/register', payload: formData})
        console.log(response)
        if (!response?.success) {
          toast({
              title: 'Register failed',
              description: "The email address you specify is already in use!",
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: "top",
          })
      } else {
          toast({
            title: 'Register Success',
            description: "Your account successfully created!",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top",
        })
        setTimeout(() => {
          route.push('/login');
        }, 2000);
      }
      } catch (error) {
        
      }
    }
  };

  return (
    <LayoutAuth metaDescription='Whisper register page' metaTitle='Register'>
      <div className='bg-background-purple bg-cover h-screen flex justify-center items-center'>
          <Card width='sm'>
            <CardHeader className='flex flex-col items-center gap-2'>
              <Image src='/whisperLogo.png' width={50} height={50} />
              <Heading size='md'>Register</Heading>
              <Text>Let's create your whisper account!</Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' gap={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={MdIcon.MdOutlinePerson} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input
                    type='text'
                    placeholder='Enter your name'
                    variant='flushed'
                    borderBottomColor='brand.purple'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.name && <Text color='red.500'>{errors.name}</Text>}

                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={MdIcon.MdOutlineMail} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    variant='flushed'
                    borderBottomColor='brand.purple'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && <Text color='red.500'>{errors.email}</Text>}

                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={MdIcon.MdOutlineCalendarMonth} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input type='date' variant='flushed' borderBottomColor='brand.purple' name='dob' onChange={handleChange} value={formData.dob}/>
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={BiSolidBookHeart} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input
                    type='text'
                    placeholder='Enter your hobbies'
                    variant='flushed'
                    borderBottomColor='brand.purple'
                    name='hobby'
                    value={formData.hobby}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={MdIcon.MdOutlinePhone} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input
                    type='text'
                    placeholder='Enter your phone number'
                    variant='flushed'
                    borderBottomColor='brand.purple'
                    name='phone'
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={MdIcon.MdOutlinePassword} pointerEvents='none' color='gray.300' fontSize='1.2em' />
                  </InputLeftElement>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    variant='flushed'
                    borderBottomColor='brand.purple'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <Icon
                      width='4.5rem'
                      as={showPassword ? IoMdEye : IoMdEyeOff}
                      color={showPassword ? 'brand.purple' : 'gray.300'}
                      fontSize='1.2em'
                      cursor='pointer'
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && <Text color='red.500'>{errors.password}</Text>}

                <Button bgColor='brand.purple' color='white' onClick={handleSubmit}>
                  Register
                </Button>
              </Flex>
              <Divider />
              <Text textAlign='center' mt={4}>
                Already have an account? <Link href='/login' color='brand.purple'>
                  Login
                </Link>
              </Text>
            </CardBody>
          </Card>
      </div>
    </LayoutAuth>
  );
}
