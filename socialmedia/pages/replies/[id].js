import ConfirmationModal from "@/components/confirmation_modal";
import PostCard from "@/components/postcard";
import Post from "@/components/postfield";
import { UserContext } from "@/context/userContext";
import { useMutation } from "@/hooks/useMutation";
import Layout from "@/layout";
import { Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

export default function Replies() {
  const route = useRouter();
  const { id: postId } = route.query;
  const { mutate, isLoading, isError } = useMutation();
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const {id : replyId, setId, openConfirmation} = useContext(UserContext)
  const toast = useToast()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, repliesResponse] = await Promise.all([
          mutate({
            url: `/api/post/${postId}`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }),
          mutate({
            url: `/api/reply/${postId}`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }),
        ]);

        setPost(postResponse.data || {});
        setReplies(repliesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const deleteReply = async (event) => {
    event.preventDefault()
    console.log(replyId)
    const response = await mutate({url: `/api/reply/delete?id=${replyId}`, method : 'DELETE', headers: {
      'Authorization': `Bearer ${Cookies.get("user_token")}`
    }})
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
      }, 500);
    }
  } 

  return (
    <Layout metaTitle="Replies">
      <Flex direction="column" alignItems="center">
        <Button
          onClick={() => route.back()}
          leftIcon={<MdArrowBack />}
          className="w-full lg:w-1/2"
          justifyContent="flex-start"
          bg="transparent"
          _hover={{ color: "brand.purple" }}
        >
          Back
        </Button>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.purple"
            size="xl"
          />
        ) : isError ? (
          <Button
            backgroundColor="brand.purple"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        ) : (
          <PostCard
            key={post.id}
            id={post.id}
            name={post.user?.name}
            description={post.description}
            likesCount={post.likes_count}
            repliesCount={post.replies_count}
            isLike={post.is_like_post}
          />
        )}
        <Post id={postId} />
        <Text fontSize="lg" fontWeight={500} my={4}>
          Replies
        </Text>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.purple"
            size="xl"
          />
        ) : replies.length > 0 ? (
          replies.map((reply) => (
            <PostCard
              key={reply.id}
              id={reply.id}
              name={reply.user?.name}
              description={reply.description}
              is_own_reply={reply.is_own_reply}
              handleDelete = {(e) => {
                e.preventDefault()
                setId(reply?.id)
                openConfirmation()
              }}
            />
          ))
        ) : (
          <Text>There is no reply for this post</Text>
        )}
      </Flex>
      <ConfirmationModal id={replyId} type='reply' deleteData={deleteReply}/>
    </Layout>
  );
}
