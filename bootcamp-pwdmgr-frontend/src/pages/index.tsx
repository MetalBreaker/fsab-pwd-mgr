import { Button, Container, HStack, Spacer, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import AddPasswordModal from "@/components/AddPasswordModal";
import Passwords from "@/components/Passwords";

export default function Home() {
  const [addPasswordDialog, setAddPasswordDialog] = useState(false);

  return (
    <div>
      <AddPasswordModal
        isOpen={addPasswordDialog}
        onClose={() => setAddPasswordDialog(false)}
      />
      <Container maxW="container.sm">
        <Text textAlign="center" my={10} fontSize="5xl" fontWeight={800}>
          Passwords
        </Text>
        <VStack width="100%">
          <Button onClick={() => setAddPasswordDialog(true)}>Add Password</Button>
          <Passwords/>
        </VStack>
      </Container>
    </div>
  );
}
