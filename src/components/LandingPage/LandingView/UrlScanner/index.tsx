import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Text,
  Button
} from "@chakra-ui/react";
import ReactModal from "react-modal";
import MyButton from "../../../common/MyButton";
import { ChangeEvent, useRef, useState } from "react";
import { IStoreUserData } from "../../../../interface/user";
import { storeUserData } from "../../../../api/user.api";
import { FiCheckCircle } from "react-icons/fi";

import ReCAPTCHA from "react-google-recaptcha";
import { IoCloseSharp } from "react-icons/io5";

const UrlScanner = () => {
  const customStyles = {
    overlay: {
      backgroundColor: "#000000c4",
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      backgroundColor: "#191818",
      border: "1px solid #191818",
      padding: "28px",
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<IStoreUserData>({
    name: "",
    email: "",
    phone: "",
    domain: "",
    company_name: "",
    token: "",
  });
  const [isDataStored, setIsDataStored] = useState(false);
  const captchaRef = useRef<any>(null);
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsDataStored(false);
    setUserData({
      name: "",
      email: "",
      phone: "",
      domain: "",
      company_name: "",
      token: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((pre) => ({ ...pre, [name]: value }));
  };

  const addHttps=(value:string):string=>{
    if(value.startsWith("https://www")){
      return value
    }else if(value.startsWith("https://")){
       value.replace("https://","https://www.")
    }else if(value.startsWith("www.")){
       value.replace("www.","https://www.")
    }
    return value
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      if (captchaRef?.current) {
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        await storeUserData({ ...userData,domain:addHttps(userData?.domain), token });
        setIsDataStored(true);
        setUserData({name: "",
          email: "",
          phone: "",
          domain: "",
          company_name: "",
          token: "",})
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  return (
    <>
      <Flex
        mb={1}
        justify={"center"}
        w={{
          base: "full",
          sm: "md",
          md: "lg",
        }}
      >
        <Flex
          w={"full"}
          border={"1px solid gray"}
          p={2}
          rounded={"md"}
          alignItems={"center"}
        >
          <Input
            size={{
              base: "full",
              sm: "md",
              md: "lg",
            }}
            w={{
              base: "80%",
            }}
            style={{
              outline: "none",
              border: "none",
            }}
            border={"none"}
            placeholder="Enter URL to Scan"
            color={"gray.100"}
            defaultValue={userData?.domain}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserData((pre) => ({ ...pre, domain: e.target.value }))
            }
            _placeholder={{ opacity: 1, color: "gray.600" }}
            bg={"none"}
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          />
          <MyButton label="scan for free" onClick={() => setIsOpen(!isOpen)} />
        </Flex>
      </Flex>
      <ReactModal
        isOpen={isOpen}
        bodyOpenClassName={"overflow-hidden"}
        style={customStyles}
        onRequestClose={handleCloseModal}
        preventScroll={true}
        ariaHideApp={false}
      >
        <Flex my={2} justify={"flex-end"} >
          <Button onClick={handleCloseModal}>
          <IoCloseSharp fontSize={"30px"} />
          </Button>
        </Flex>
        {!isDataStored && (
          <form action="" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="John Doe"
                size={"lg"}
                name="name"
                defaultValue={userData?.name}
                onChange={handleChange}
                width={{
                  base: "300px",
                  sm: "400px",
                  md: "500px",
                }}
                _placeholder={{
                  color: "gray.600",
                }}
                border={"1px solid gray"}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="john@vulnshields.net"
                size={"lg"}
                name="email"
                defaultValue={userData?.email}
                onChange={handleChange}
                width={{
                  base: "300px",
                  sm: "400px",
                  md: "500px",
                }}
                _placeholder={{
                  color: "gray.600",
                }}
                border={"1px solid gray"}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="+91 1234567890"
                size={"lg"}
                name="phone"
                defaultValue={userData?.phone}
                onChange={handleChange}
                width={{
                  base: "300px",
                  sm: "400px",
                  md: "500px",
                }}
                _placeholder={{
                  color: "gray.600",
                }}
                border={"1px solid gray"}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                placeholder="Vulnshields"
                size={"lg"}
                name="company_name"
                defaultValue={userData?.company_name}
                onChange={handleChange}
                width={{
                  base: "300px",
                  sm: "400px",
                  md: "500px",
                }}
                _placeholder={{
                  color: "gray.600",
                }}
                border={"1px solid gray"}
              />
            </FormControl>
            <FormControl isRequired mt={4}  mb={2}>
              <FormLabel>Website URL</FormLabel>
              <Input
                type="text"
                placeholder="https://www.vulnshields.net"
                size={"lg"}
                name="domain"
                defaultValue={userData?.domain}
                onChange={handleChange}
                width={{
                  base: "300px",
                  sm: "400px",
                  md: "500px",
                }}
                _placeholder={{
                  color: "gray.600",
                }}
                border={"1px solid gray"}
              />
              
            </FormControl>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
              style={{
                width: "100%",
              }}
            />

            <MyButton
              label="submit"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
              type="submit"
            />
          </form>
        )}
        {isDataStored && (
          <Flex
            justify={"center"}
            align={"center"}
            direction="column"
            rowGap={4}
          >
            <FiCheckCircle fontSize={"40px"} color="#0eeb0e" />
            <Text textAlign={"center"}>
              Thank you for your submission. Your request has been successfully
              received. Our system is currently processing it, and you can
              expect to receive your report via email within the next 24 hours.
            </Text>
          </Flex>
        )}
      </ReactModal>
    </>
  );
};

export default UrlScanner;
