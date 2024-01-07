import { useMutation } from "@/hooks/useMutation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Icon, Link as ChakraLink, Text, Flex, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MdLogout, MdOutlineHome, MdOutlineNotifications, MdOutlinePerson } from "react-icons/md";

export default function Header() {
    const {mutate} = useMutation()
    const route = useRouter()
    const handleLogout = async (event) => {
        event.preventDefault()

        const response = await mutate({
            url: "/api/auth/logout", 
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("user_token")}`
            },
        })

        if (!response?.success) {
            console.log("Gagal Logout")
        } else {
            Cookies.remove("user_token")
            route.push('/login')
        }
    }

  return (
    <Flex align="center" p={4} justifyContent="space-between" borderBottom="1px" backgroundColor="brand.purple" position="sticky" top="0" zIndex="sticky">
      <Flex align="center">
        <Image src="/whisperLogo.png" alt="Whisper Logo" width={36} height={36} />
        <Text ml={2} fontWeight="bold" color="white">
          Whisper
        </Text>
      </Flex>
      <Flex alignSelf="center" flex={1} justify="center">
        <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", gap: "16px" }}>
          <li>
          <NextLink href="/" passHref>
              <Icon as={MdOutlineHome} boxSize={6} color="white" />
          </NextLink>
          </li>
          <li>
          <NextLink href="/notification" passHref>
              <Icon as={MdOutlineNotifications} boxSize={6} color="white" />
          </NextLink>
          </li>
          <li>
          <NextLink href="/profile" passHref>
              <Icon as={MdOutlinePerson} boxSize={6} color="white" />
          </NextLink>
          </li>
        </ul>
      </Flex>
      <Flex>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} color="brand.purple" />
          <MenuList>
            <MenuItem icon={<MdLogout />} onClick={handleLogout}>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
