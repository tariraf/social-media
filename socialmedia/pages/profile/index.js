import ConfirmationModal from "@/components/confirmation_modal"
import ModalForm from "@/components/modalForm"
import PostCard from "@/components/postcard"
import Post from "@/components/postfield"
import { UserContext } from "@/context/userContext"
import { useMutation } from "@/hooks/useMutation"
import { useQueries } from "@/hooks/useQueries"
import Layout from "@/layout"
import { Avatar, Box, Card, Divider, Flex, Icon, Spinner, Text, useToast } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useContext } from "react"
import { BiSolidBookHeart } from "react-icons/bi"
import { MdOutlineCalendarMonth, MdOutlinePhone } from "react-icons/md"

export default function Profile() {
    const {userData, id, setId, openConfirmation, openModal} = useContext(UserContext)
    const {data: posts, isLoading} = useQueries({
        prefixUrl: "/api/post/me",
        headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`
        }
      })
    const {mutate} = useMutation()
    const route = useRouter()
    const toast = useToast()
    const deletePost = async (event) => {
        event.preventDefault()
        console.log(id)
        const response = await mutate({url: `/api/post/delete?id=${id}`, method : 'DELETE', headers: {
          'Authorization': `Bearer ${Cookies.get("user_token")}`
        }})
        console.log(response)
        if (!response?.success) {
          toast({
              title: 'Delete data failed',
              description: "There might be something wrong!",
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: "top",
          })
        } else {
            toast({
              title: 'Delete Data Success',
              description: "Data successfully deleted!",
              status: 'success',
              duration: 2000,
              isClosable: true,
              position: "top",
          })
          setTimeout(() => {
            route.reload();
          }, 2000);
        }
    } 
    return(
        <Layout metaTitle='Profile'>
            <Flex direction='column' alignItems='center'>
                <Flex className="w-full lg:w-1/2 border-2 border-solid border-x-0 border-t-0 border-neutral-300" p={3} gap={5} direction='column'>
                    <Flex alignItems='center' gap={4} width='100%'>
                        <Avatar name={userData?.name} size="lg" />
                        <Flex direction='column'>
                            <Text fontSize='lg' fontWeight={700} height='fit-content'>{userData?.name}</Text>
                            <Text color='grey.500'>{userData?.email}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={4} pb={2}>
                        <Flex alignItems='center' gap={2}>
                            <Icon as={MdOutlineCalendarMonth} color='brand.purple'/>
                            <Text>{userData?.dob || "N/A"}</Text>
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <Icon as={BiSolidBookHeart} color='brand.purple'/>
                            <Text>{userData?.hobby || "N/A"}</Text>
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <Icon as={MdOutlinePhone} color='brand.purple'/>
                            <Text>{userData?.phone || "N/A"}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Post />
                <Flex  className="w-full lg:w-1/2 pl-3">
                    <Text textDecoration='underline' fontSize='lg' fontWeight={500} color='brand.purple'>Posts {posts?.data?.length}</Text>
                </Flex>
                {isLoading? <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='brand.purple'
                    size='xl'
                /> : 
                posts?.data?.map((post) => (
                    <PostCard
                    key={post?.id}
                    id={post?.id}
                    name={post?.user?.name}
                    description={post?.description}
                    likesCount={post?.likes_count}
                    repliesCount={post?.replies_count}
                    isLike={post?.is_like_post}
                    is_own_post={post?.is_own_post}
                    handleDelete = {(e) => {
                      e.preventDefault()
                      setId(post?.id)
                      openConfirmation()
                    }}
                    handleEdit = {() => {
                      setId(post?.id)
                      openModal()
                    }}
                    createdAt= {post?.created_at}
                    updatedAt= {post?.updated_at}
                  />
                ))}
            </Flex>
            <ConfirmationModal id={id} type='post' deleteData={deletePost}/>
            <ModalForm id={id} />
        </Layout>
    )
}