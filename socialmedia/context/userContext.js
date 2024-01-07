import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import { useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }) {
  const [userData, setUserData] = useState()
  const {mutate} = useMutation()
  const [id, setId] = useState()
  const { isOpen : isConfirmed, onOpen: openConfirmation, onClose: closeConfirmation } = useDisclosure()
  const { isOpen : isAddModal, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure()
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
    fetchingData()
  },[])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchingData = async () => {
    const response = await mutate({
        url: '/api/auth/me', 
        method: "GET",
        headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`
        },
    })
    setUserData(response?.data)
  }
  const state = {userData, fetchingData, isConfirmed, openConfirmation, closeConfirmation, id, setId, isModalOpen, openModal, setIsModalOpen, closeModal, isAddModal, openAddModal, closeAddModal}
  return (
    <UserContext.Provider value={state} {...props}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
