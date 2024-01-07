import { UserContext } from '@/context/userContext';
import { useMutation } from '@/hooks/useMutation';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
    Textarea,
    Spinner,
    Flex,
    Avatar,
    useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

export default function AddModal() {
    const { userData,isAddModal : isModalOpen, setId, closeAddModal : closeModal } = useContext(UserContext)
    const [input, setInput] = useState({
        description: ""
    });
    const route = useRouter();
    const { mutate, isLoading, isError } = useMutation();
    const toast = useToast()

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(input)
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
            setTimeout(() => {
                route.reload();
              }, 1000);
        }
    }

    return (
        <Modal isOpen={isModalOpen} onClose={(e) => { setId(undefined); closeModal(); }}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                {isLoading ? (
                    <div className='flex justify-center'>
                        <Spinner size='xl' />
                    </div>
                ) : (
                <Flex direction='column' className="w-full" gap={2} my={4} p={3}>
                    <Flex alignItems="start">
                        <Avatar name={userData?.name} />
                        <Flex direction="column" ml={4} width="100%">
                            <ReactTextareaAutosize
                            name='description'
                            className="p-3 border border-solid border-x-0 border-t-0 border-purple-500 focus-within:border-purple-500"
                            value={input.description}
                            onChange={handleChange}
                            placeholder={'What\'s happening?'}
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
                    <Button onClick={handleSubmit} isLoading={isLoading} backgroundColor='brand.purple' color='white' width={20} alignSelf='flex-end'>
                        Post
                    </Button>
                </Flex>
                )}
            </ModalContent>
        </Modal>
    )
}
