import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Input, Spacer, VStack } from "@chakra-ui/react";
import axios from "axios";
import PasswordInput from "./PasswordInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddPasswordModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: any) {
    // Block the default form handler behavior.
    e.preventDefault();

    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    axios
      .post("http://localhost:8080/passwords", {
        name: e.target.name.value,
        icon: e.target.icon.value,
        username: e.target.username.value,
        password: e.target.password.value
      })
      .then(function (response) {
        // handle success
        onClose();
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Add Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input required name="name" placeholder="Account name" />
              <Input type="url" name="icon" placeholder="Icon URL" />
              <Spacer />
              <Input required name="username" placeholder="Username" />
              <PasswordInput required name="password" placeholder="Password" />
            </VStack>
          </ModalBody>
          <ModalFooter alignItems="center">
            <Button margin="auto" colorScheme="blue" type="submit" isLoading={isLoading}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddPasswordModal;
