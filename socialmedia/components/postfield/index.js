import { useContext, useState } from 'react';
import {  Avatar, Button, Flex, Input, useToast } from '@chakra-ui/react';
import ReactTextareaAutosize from "react-textarea-autosize";
import { UserContext } from '@/context/userContext';
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
export default function Post(props) {
    const postId = props.id
    const { userData } = useContext(UserContext);
    const [input, setInput] = useState({
        description: ''
    });
    const placeholder = postId? 'Post your reply': 'What\'s happening?';
    const {mutate, isLoading} =  useMutation()
    const toast = useToast()
    const route = useRouter()
    const handlePost  = async (e) => {
        e.preventDefault()

        if(!postId){
            const response = await mutate(
                {
                    url : `/api/post/create`, 
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("user_token")}`} , 
                    payload: input
                }
            )
    
            console.log(response)
    
            if (!response?.success) {
                toast({
                    title: 'Post failed',
                    description: "There's something wrong",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                })
            } else {
                toast({
                    title: 'Added  Post Success',
                    description: "Data successfully added!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                })
                route.reload()
            }
        } else {
            const response = await mutate(
                {
                    url : `/api/reply/create?id=${postId}`, 
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("user_token")}`} , 
                    payload: input
                }
            )
    
            console.log(response)
    
            if (!response?.success) {
                toast({
                    title: 'Reply failed',
                    description: "There's something wrong",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                })
            } else {
                toast({
                    title: 'Reply Success',
                    description: "Data successfully added!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                })
                route.reload()
            }
        }

    }
    return(
        <Flex direction='column' className="w-full lg:w-1/2" gap={2} my={4} p={3}>
            <Flex alignItems="start">
                <Avatar name={userData?.name} />
                <Flex direction="column" ml={4} width="100%">
                    <ReactTextareaAutosize
                    name='description'
                    className="p-3 border border-solid border-x-0 border-t-0 border-purple-500 focus-within:border-purple-500"
                    value={input.description}
                    onChange={(e) => setInput({...input, [e.target.name] : e.target.value})}
                    placeholder={placeholder}
                    minRows={3}
                    p={2}
                    fontSize="lg"
                    border="none"
                    resize="none"
                    _placeholder={{
                        color: 'gray.500',
                    }}
                    />
                </Flex>
            </Flex>
            <Button isLoading={isLoading} backgroundColor='brand.purple' color='white' width={20} alignSelf='flex-end' onClick={handlePost}>
            {postId? 'Reply' : 'Post'}
            </Button>
        </Flex>
    )
}