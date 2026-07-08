import {
  Link,
  useColorModeValue
} from "@chakra-ui/react";

import { FaExternalLinkAlt } from "react-icons/fa";
import { PRIMARYCOLOR } from "../../../utils/color";

interface IFreeTrialForm {
  label: string;
  isIcon?:Boolean

}

const FreeTrialForm = ({ label,isIcon=true }: IFreeTrialForm) => {
  return (
    <>
     
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLScIh5WcoVaCqEGO2qdfEB166beaCEpxpckStBgyryBN57JHyA/viewform"
        isExternal
        size={"lg"}
        bg={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
        textTransform={"uppercase"}
        _hover={{ transform: "translateY(-5px)" }}
        display={"flex"}
        alignItems={"center"}
        columnGap={2}
        px={4}
        py={2}
        rounded={"lg"}
        fontWeight={"bold"}
      >{label}
       {isIcon &&  <FaExternalLinkAlt />}
      </Link>
    
    </>
  );
};

export default FreeTrialForm;
