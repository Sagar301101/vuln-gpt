import { Button,useColorModeValue } from "@chakra-ui/react";
import { PRIMARYCOLOR } from "../../../utils/color";

interface IMyButton{
    label:string;
    onClick:()=>void
}

const MyButton = ({label,onClick}:IMyButton) => (
    <Button
        onClick={onClick}
        size={"lg"}
        bg={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
        textTransform={"uppercase"}
        _hover={{ transform: "translateY(-5px)" }}
    >
        {label}
    </Button>
);

export default MyButton;
