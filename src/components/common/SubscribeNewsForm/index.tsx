import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import MyButton from "../MyButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { PRIMARYCOLOR } from "../../../utils/color";
import { IStoreSubscribeData, storeSubscribeData } from "../../../api/sheet.api";




const SubscribeNewsForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<IStoreSubscribeData>({
    email: "",
    name: "",
  });

  const isSubmitButtonDisable=()=>{
    return !formData?.email || !formData?.name || formData?.name?.trim()==="" || formData?.email?.trim()===""
  }
  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    onClose()
    event.preventDefault();
    try {
      await storeSubscribeData(formData)
    
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MyButton label="Subscribe" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe Our Newsletter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="subscription-form" onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel>Enter name</FormLabel>
                <Input
                  placeholder="John Doe"
                  defaultValue={formData?.name}
                  onChange={handleFormData}
                  mb={4}
                  name="name"
                  type="text"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="john@gmail.com"
                  value={formData?.email}
                  onChange={handleFormData}
                  name="email"
                />
              </FormControl>

            
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
              textTransform={"uppercase"}
              _hover={{ transform: "translateY(-5px)" }}
              mr={3}
              form="subscription-form"
              type="submit"
              isDisabled={isSubmitButtonDisable()}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubscribeNewsForm;
