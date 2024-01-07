import { UserContext } from "@/context/userContext";
import { AddIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useContext } from "react";

const StickyIconButton = () => {
  const {openAddModal} = useContext(UserContext)
  return (
    <Box position="fixed" bottom="10" right="10" zIndex="sticky">
      <IconButton
        isRound={true}
        variant='solid'
        icon={<AddIcon />}
        aria-label="Scroll to top"
        onClick={openAddModal}
        backgroundColor='brand.purple'
        color='white'
        fontSize='xl'
      />
    </Box>
  );
};

export default StickyIconButton;
