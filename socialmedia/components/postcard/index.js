import { Avatar, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useMutation } from "@/hooks/useMutation";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { UserContext } from "@/context/userContext";
export default function PostCard(props) {
    const [postLike, setPostLike] = useState({
      isLike  : props.isLike,
      likesCount : props.likesCount
    })
    const postId = props.id
    const {mutate} = useMutation()
    const route = useRouter()
    const handleLike = async (event) => {
      event.preventDefault()

      if (postLike.isLike == false) {
        const response = await mutate({url: `/api/likes/${postId}`,
          headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`} , 
        })

        if (response?.success) {
          setPostLike({...postLike, isLike: true, likesCount: postLike.likesCount+1})
        } else {
          console.log("Liking post failed")
        }
      } else {
        const response = await mutate({url: `/api/unlikes/${postId}`,
          headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`} , 
        })

        if (response?.success) {
          setPostLike({...postLike, isLike: false, likesCount: postLike.likesCount-1})
        } else {
          console.log("Liking post failed")
        }
      }
    }
    return(
        <Flex direction="row" className="w-full lg:w-1/2" alignItems="flex-start" p={3} borderBottomWidth="1px">
          <Avatar name={props.name} size="md" />
          <Flex direction="column" ml={4}>
            <Text fontWeight={700}>{props.name}</Text>
            <Text>{props.description}</Text>
          
            <Stack direction='row' spacing={4} alignItems='center'>
              <Button onClick={handleLike} px={0} bg='transparent' color={postLike.isLike? 'brand.purple' : 'black'} leftIcon={postLike.isLike? <GoHeartFill  /> : <GoHeart />} colorScheme='teal' variant='solid' _hover={{ bg: 'transparent', color:'brand.purple' }}>
                {postLike.likesCount}
              </Button>
              <Button onClick={()=>route.push(`/replies/${postId}`)} px={0} bg='transparent' color='black' leftIcon={<LuMessageCircle />} colorScheme='teal' variant='solid' _hover={{ bg: 'transparent', color:'brand.purple' }}>
                {props.repliesCount}
              </Button>
              {props.is_own_post && (
                <Menu>
                  <MenuButton  _active={{bg:'transparent', color:'brand.purple'}} as={Button} px={0} bg="transparent" color="black" colorScheme="teal" variant="solid" _hover={{ bg: "transparent", color: "brand.purple" }}>
                    <IoEllipsisHorizontalSharp />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={props.handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )}
              {props.is_own_reply && (
                <Menu>
                  <MenuButton as={Button} px={0} bg="transparent" color="black" colorScheme="teal" variant="solid" _hover={{ bg: "transparent", color: "brand.purple" }} _active={{bg:'transparent', color:'brand.purple'}}>
                    <IoEllipsisHorizontalSharp />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
            {
                props.createdAt !== props.updatedAt &&(
                  <Text fontStyle='italic' fontWeight={200}>Edited</Text>
                )
            }
          </Flex>
        </Flex>
    )
}