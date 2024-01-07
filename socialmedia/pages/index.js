import ConfirmationModal from "@/components/confirmation_modal";
import ModalForm from "@/components/modalForm";
import PostCard from "@/components/postcard";
import Post from "@/components/postfield";
import { UserContext } from "@/context/userContext";
import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {
  const toast = useToast()
  const {data: posts, isLoading} = useQueries({
    prefixUrl: "/api/post",
    headers: {
        'Authorization': `Bearer ${Cookies.get("user_token")}`
    }
  })
  
  const {id, setId, openConfirmation, openModal} = useContext(UserContext)
  const {mutate} = useMutation()
  const route = useRouter()
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
  return (
    <Layout metaTitle='Home'>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Post />
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
  );
}
