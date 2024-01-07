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
  } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
export default function ConfirmationModal({id, type, deleteData}) {
    const {isConfirmed, closeConfirmation, setId} = useContext(UserContext)
    const [title, setTitle] = useState('')
    const { mutate, isLoading, isError } = useMutation();
    const selectedId = id;
    const route = useRouter()
  
    // const handleDelete = async (event) => {
    //     event.preventDefault()

    //     const result = await mutate({url: `/api/notes/delete/${selectedId}`, method : 'DELETE'})
    //     console.log(id)
    //     if (result?.success) {
    //         console.log('Notes deleted successfully:', result)
    //         route.reload()
    //     }
    // }

    return(
        <Modal isOpen={isConfirmed} onClose={() => {
            setId('');
            closeConfirmation()
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this {type}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor='brand.purple' color='white' mr={3} onClick={(e) => {
                e.preventDefault()
                setId('');
                closeConfirmation()
            }}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={deleteData} color='brand.purple'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}