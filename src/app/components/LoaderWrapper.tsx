'use client'

import { Flex, Spinner } from "@chakra-ui/react";
import { FunctionComponent, ReactNode, Suspense } from "react";

interface LoaderWrapperProps {
    children: ReactNode
}
 
const LoaderWrapper: FunctionComponent<LoaderWrapperProps> = ({ children }) => {

    const Loader = () => <Flex align="center" justify="center"><Spinner size="lg" color="var(--de-orange)" /></Flex>

    return ( 
        <Suspense fallback={<Loader />}>
            { children }
        </Suspense>
     );
}
 
export default LoaderWrapper;