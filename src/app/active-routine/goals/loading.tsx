import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return <Flex align="center" justify="center"><Spinner size="lg" color="var(--de-orange)" /></Flex>
}