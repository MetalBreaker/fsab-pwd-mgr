import { Box, Image, Button, Divider, Text, VStack, HStack, Spacer, Icon, IconButton } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { DeleteIcon } from '@chakra-ui/icons'
import axios from "axios";

interface Props {
  id: string;
  name: string;
  icon: string;
  username: string;
  password: string;
  removePassword: Function;
}

const Password = ({ id, name, icon, username, password, removePassword }: Props) => {
  return (
    <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <HStack p={4}>
        <Image boxSize={10} src={icon} />
        <Text margin='auto' fontSize='xl' fontWeight={600}>{name}</Text>
        <IconButton aria-label='Delete password'
          icon={<DeleteIcon />}
          onClick={() => removePassword(id)} />
      </HStack>
      <Divider />
      <Box p={4}>
        <Text fontSize="s">{username}</Text>
        <Spacer />
        <PasswordInput value={password} disabled />
      </Box>
    </Box>
  );
};

export default Password;
