import { Box } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import Navbar from "./navbar";
import { useThemeContext } from "../hooks/useThemeContext";

interface ActiveRoutineLayoutProps {
    children: ReactNode
}
 
const ActiveRoutineLayout: FunctionComponent<ActiveRoutineLayoutProps> = ({ children }) => {

    return ( 
        <Box display="grid" gridTemplateColumns="1fr 9fr" gap="1rem" h="100vh" p="1rem" bgColor="var(--purple-dark)">
            <Navbar />
            { children }
        </Box>
    );
}
 
export default ActiveRoutineLayout;