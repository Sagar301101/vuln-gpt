import { Box, Flex, Button, useColorModeValue, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import ContentLayout from "../Layout/ContentLayout";
import { useCallback, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../../assets/logo.png";
import FreeTrialForm from "../FreeTrialForm";

const navLinks = [
  { lable: "About", id: 1, url: "#about" },
  { lable: "Products", id: 2, url: "#products" },
  { lable: "Services", id: 3, url: "#services" },
  { lable: "Blog", id: 4, url: "#news" },
  // { lable: "Contact us", id: 5, url: "#contact" },
];

export default function Nav() {
  const bgcolor = useColorModeValue(
    "linear(to-l, #7928CA, #FF0080)",
    "linear(to-l, #00142C, #011936,#10233B)"
  );
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const handleResponsiveMenuCallback = useCallback(() => {
    if (!showResponsiveMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showResponsiveMenu]);

  useEffect(() => {
    if (showResponsiveMenu) {
      setMenuHeight(window.innerHeight);
    }
  }, [showResponsiveMenu]);

  const item = {
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.6,
      },
    },
  };

  return (
    <>
  
      <AnimatePresence>
        {showResponsiveMenu && (
          <motion.div
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: menuHeight, opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={"exit"}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 9999,
              overflowY: "auto",
            }}
          >
            <Box
              bgGradient={bgcolor}
              display={{ base: "block", md: "none" }}
              w={"full"}
              h={"100%"}
              zIndex={9999}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Flex
                justifyContent={"space-between"}
                px={4}
                py={5}
                alignItems={"center"}
              >
                <Link
                  href="#home"
                  onClick={() => {
                    setShowResponsiveMenu(!showResponsiveMenu);
                    handleResponsiveMenuCallback();
                  }}
                >
                  <img src={Logo} alt="" width={"150px"} />
                </Link>

                <Button
                  onClick={() => {
                    setShowResponsiveMenu(!showResponsiveMenu);
                    handleResponsiveMenuCallback();
                  }}
                >
                  <AiOutlineClose />
                </Button>
              </Flex>
              <Flex
                w={"full"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {navLinks.map((eachLink) => (
                  <Link
                    w={"full"}
                    href={eachLink.url}
                    key={eachLink?.id}
                    textAlign={"center"}
                    color={"#0EC9AC"}
                    fontWeight={"bold"}
                    onClick={() => {
                      setShowResponsiveMenu(!showResponsiveMenu);
                      handleResponsiveMenuCallback();
                    }}
                    py={4}
                    _hover={{
                      backgroundColor: "#f9f8f817",
                    }}
                  >
                    {eachLink?.lable}
                  </Link>
                ))}
                <FreeTrialForm label="Contact us" isIcon={false} />
              </Flex>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <Box
        bgGradient={bgcolor}
        py={2}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        position={"sticky"}
        top={0}
        zIndex={100}
      >
        <ContentLayout>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} h={"full"}>
              <Link href="/">
                <img
                  src={Logo}
                  alt=""
                  width={"150px"}
                />
              </Link>
            </Flex>
            <Flex gap={6} alignItems={"center"}>
              {navLinks.map((eachLink) => (
                <Flex
                  key={eachLink?.id}
                  direction={"column"}
                  alignItems={"center"}
                >
                  <Link
                    w={"full"}
                    display={{ base: "none", md: "block" }}
                    color={"#0EC9AC"}
                    fontWeight={"bold"}
                    href={eachLink?.url}
                    style={{
                      textDecoration: "none",
                    }}
                    pb={"2px"}
                    _hover={{
                      pb: "0px",
                      borderBottom: "2px solid #0EC9AC",
                    }}
                  >
                    {eachLink?.lable}
                  </Link>
                </Flex>
              ))}
              <Flex display={{ base: "none", md: "block" }}>
              <FreeTrialForm label="Contact us" isIcon={false} />
              </Flex>
              
              <Button
                display={{ base: "block", md: "none" }}
                onClick={() => {
                  setShowResponsiveMenu(!showResponsiveMenu);
                  handleResponsiveMenuCallback();
                }}
              >
                <GiHamburgerMenu />
              </Button>
            </Flex>
          </Flex>
        </ContentLayout>
      </Box>
    </>
  );
}
