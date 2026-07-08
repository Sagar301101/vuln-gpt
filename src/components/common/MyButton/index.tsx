import { Button, Link, useColorModeValue } from "@chakra-ui/react";
import { colors } from "../../../config/color";

interface IMyButton {
  label: string;
  onClick?: () => void;
  style?: { [key: string]: string };
  bgColor?: string;
  type?: "submit" | "button";
}

const MyButton = ({ label, onClick, style, bgColor, type }: IMyButton) => (
  <Button
    onClick={onClick}
    size={{
      base: "sm",
      md: "md",
      lg: "lg",
    }}
    bg={
      bgColor
        ? bgColor
        : useColorModeValue(
            colors?.light.button.background,
            colors.dark.button.background
          )
    }
    textTransform={"uppercase"}
    _hover={{ transform: "scale(1.02)" }}
    style={style}
    type={type}
  >
    {label}
  </Button>
);

export const ContacUs = ({ label, onClick, style }: IMyButton) => (
  <Button
    onClick={onClick}
    as={Link}
    size={{
      base: "sm",
    }}
    href="https://docs.google.com/forms/d/e/1FAIpQLScIh5WcoVaCqEGO2qdfEB166beaCEpxpckStBgyryBN57JHyA/viewform"
    target="_blank"
    bg={useColorModeValue(
      colors?.light.button.background,
      colors.dark.button.background
    )}
    textTransform={"uppercase"}
    _hover={{ transform: "scale(1.02)" }}
    style={{ ...style, textDecoration: "none" }}
   
  >
    {label}
  </Button>
);

export const FreeDemoButton = ({
  label,
  onClick,
  style,
  bgColor,
}: IMyButton) => (
  <Button
    onClick={onClick}
    as={Link}
    size={{
      base: "sm",
      md: "md",
      lg: "lg",
    }}
    href="https://docs.google.com/forms/d/e/1FAIpQLScIh5WcoVaCqEGO2qdfEB166beaCEpxpckStBgyryBN57JHyA/viewform"
    target="_blank"
    bg={
      bgColor
        ? bgColor
        : useColorModeValue(
            colors?.light.button.background,
            colors.dark.button.background
          )
    }
    textTransform={"uppercase"}
    _hover={{ transform: "scale(1.02)" }}
    style={{
      ...style,
      textDecoration: "none",
    }}
    wordBreak={"break-all"}
  >
    {label}
  </Button>
);

export default MyButton;
