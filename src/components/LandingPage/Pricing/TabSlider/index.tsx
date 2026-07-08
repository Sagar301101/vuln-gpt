import {
  TabList,
  Tabs,
  Tab,
  TabIndicator,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

import { colors } from "../../../../config/color";

interface TabData {
  label: string;
}

interface TabSliderComponentProps {
  tabs: TabData[];
  onTabChange: (index: number) => void;
  currentActiveTab: number;
}

const TabSliderComponent = ({
  tabs,
  onTabChange,
  currentActiveTab,
}: TabSliderComponentProps) => {
  return (
    <>
      <Flex
        justify={{
          base: "center",
          md: "flex-end",
        }}
        align={"center"}
      >
        <Tabs
          alignSelf={"flex-end"}
          position="relative"
          variant="unstyled"
          onChange={onTabChange}
          defaultIndex={currentActiveTab}
          w={"auto"}
          maxW={"275px"}
          bg={useColorModeValue(
            colors?.light?.pricing?.cardBg,
            colors?.dark?.pricing?.cardBg
          )}
          rounded={"full"}
          py={2}
        >
          <TabList>
            {tabs?.map((tab, index) => (
              <Tab key={index} zIndex={1} px={10}>
                {tab?.label}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            mt="-45px"
            height="50px"
            bgImage={useColorModeValue(
              colors?.light?.bgImage,
              colors?.dark?.bgImage
            )}
            borderRadius="1px"
            rounded={"full"}
          />
        </Tabs>
      </Flex>
    </>
  );
};

export default TabSliderComponent;
