import { Box } from '@chakra-ui/react'
import  { ReactNode } from 'react'

const ProjectWrapper = ({children}:{children:ReactNode}) => {
  return (
    <Box w={"full"} px={{
        base:4,
        md:8,
        lg:14,
        xl:20
    }}>
      {children}
    </Box>
  )
}

export default ProjectWrapper
