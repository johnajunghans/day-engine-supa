'use client'

import { Button, Flex } from "@chakra-ui/react"
import Image from "next/image";
import { useThemeContext } from "../hooks/useThemeContext"
import { FunctionComponent, useState } from "react";
import AccountForm from "../(auth)/account/account-form";
import { User } from "@supabase/supabase-js";
import useClose from "../hooks/useClose";
import Link from "next/link";
import ThemeSelector from "../theme-selector";
import { usePathname } from "next/navigation";

interface LinkTileProps {
    routeName: string,

}

export default function Navbar() {

    const { theme } = useThemeContext();
    const [showAccountForm, setShowAccountForm] = useState(false);
    const pathname = usePathname()

    useClose({id: "account-form-container", stateUpdateFunction: setShowAccountForm})

    const Settings = () => {
        return (
            <svg role="button" onClick={() => setShowAccountForm(true)} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className=" hover:rotate-90 duration-200 cursor-pointer">
                <path d="M35.5666 27.5C35.3226 28.053 35.2498 28.6664 35.3576 29.2611C35.4655 29.8558 35.749 30.4046 36.1716 30.8367L36.2816 30.9467C36.6226 31.2872 36.893 31.6916 37.0775 32.1367C37.2621 32.5819 37.357 33.059 37.357 33.5408C37.357 34.0227 37.2621 34.4998 37.0775 34.945C36.893 35.3901 36.6226 35.7945 36.2816 36.135C35.9411 36.4759 35.5367 36.7464 35.0916 36.9309C34.6465 37.1154 34.1693 37.2104 33.6875 37.2104C33.2056 37.2104 32.7285 37.1154 32.2834 36.9309C31.8382 36.7464 31.4338 36.4759 31.0933 36.135L30.9833 36.025C30.5512 35.6024 30.0024 35.3188 29.4077 35.211C28.813 35.1032 28.1996 35.176 27.6466 35.42C27.1044 35.6524 26.6419 36.0383 26.3162 36.5302C25.9905 37.022 25.8157 37.5984 25.8133 38.1883V38.5C25.8133 39.4725 25.427 40.4051 24.7394 41.0927C24.0517 41.7804 23.1191 42.1667 22.1466 42.1667C21.1742 42.1667 20.2416 41.7804 19.5539 41.0927C18.8663 40.4051 18.48 39.4725 18.48 38.5V38.335C18.4658 37.7282 18.2694 37.1397 17.9162 36.646C17.5631 36.1523 17.0697 35.7762 16.5 35.5667C15.947 35.3226 15.3336 35.2498 14.7389 35.3577C14.1442 35.4655 13.5954 35.749 13.1633 36.1717L13.0533 36.2817C12.7128 36.6226 12.3084 36.893 11.8633 37.0776C11.4181 37.2621 10.941 37.3571 10.4591 37.3571C9.97729 37.3571 9.50016 37.2621 9.05503 37.0776C8.60991 36.893 8.20551 36.6226 7.86498 36.2817C7.52407 35.9411 7.25362 35.5368 7.06909 35.0916C6.88457 34.6465 6.78959 34.1694 6.78959 33.6875C6.78959 33.2057 6.88457 32.7285 7.06909 32.2834C7.25362 31.8383 7.52407 31.4339 7.86498 31.0933L7.97498 30.9833C8.39763 30.5513 8.68115 30.0025 8.78899 29.4078C8.89682 28.813 8.82402 28.1996 8.57998 27.6467C8.34758 27.1044 7.9617 26.642 7.46983 26.3162C6.97797 25.9905 6.40159 25.8157 5.81165 25.8133H5.49998C4.52752 25.8133 3.59489 25.427 2.90725 24.7394C2.21962 24.0518 1.83331 23.1191 1.83331 22.1467C1.83331 21.1742 2.21962 20.2416 2.90725 19.554C3.59489 18.8663 4.52752 18.48 5.49998 18.48H5.66498C6.2718 18.4658 6.86032 18.2694 7.35403 17.9163C7.84773 17.5632 8.22379 17.0697 8.43331 16.5C8.67736 15.947 8.75016 15.3337 8.64232 14.7389C8.53449 14.1442 8.25096 13.5954 7.82831 13.1633L7.71831 13.0533C7.3774 12.7128 7.10695 12.3084 6.92243 11.8633C6.7379 11.4182 6.64293 10.941 6.64293 10.4592C6.64293 9.97732 6.7379 9.50019 6.92243 9.05506C7.10695 8.60994 7.3774 8.20554 7.71831 7.86501C8.05885 7.5241 8.46324 7.25365 8.90836 7.06912C9.35349 6.8846 9.83062 6.78963 10.3125 6.78963C10.7943 6.78963 11.2715 6.8846 11.7166 7.06912C12.1617 7.25365 12.5661 7.5241 12.9066 7.86501L13.0166 7.97501C13.4487 8.39766 13.9975 8.68118 14.5922 8.78902C15.187 8.89685 15.8004 8.82405 16.3533 8.58001H16.5C17.0422 8.34761 17.5047 7.96173 17.8304 7.46986C18.1562 6.978 18.331 6.40162 18.3333 5.81168V5.50001C18.3333 4.52755 18.7196 3.59492 19.4073 2.90729C20.0949 2.21965 21.0275 1.83334 22 1.83334C22.9724 1.83334 23.9051 2.21965 24.5927 2.90729C25.2803 3.59492 25.6666 4.52755 25.6666 5.50001V5.66501C25.669 6.25495 25.8438 6.83133 26.1695 7.3232C26.4953 7.81506 26.9577 8.20094 27.5 8.43334C28.0529 8.67739 28.6663 8.75019 29.2611 8.64235C29.8558 8.53452 30.4046 8.25099 30.8366 7.82834L30.9466 7.71834C31.2872 7.37743 31.6916 7.10698 32.1367 6.92246C32.5818 6.73794 33.059 6.64296 33.5408 6.64296C34.0227 6.64296 34.4998 6.73794 34.9449 6.92246C35.3901 7.10698 35.7944 7.37743 36.135 7.71834C36.4759 8.05888 36.7463 8.46327 36.9309 8.9084C37.1154 9.35352 37.2104 9.83065 37.2104 10.3125C37.2104 10.7944 37.1154 11.2715 36.9309 11.7166C36.7463 12.1618 36.4759 12.5661 36.135 12.9067L36.025 13.0167C35.6023 13.4488 35.3188 13.9975 35.211 14.5923C35.1031 15.187 35.1759 15.8004 35.42 16.3533V16.5C35.6524 17.0423 36.0383 17.5047 36.5301 17.8304C37.022 18.1562 37.5984 18.331 38.1883 18.3333H38.5C39.4724 18.3333 40.4051 18.7197 41.0927 19.4073C41.7803 20.0949 42.1666 21.0275 42.1666 22C42.1666 22.9725 41.7803 23.9051 41.0927 24.5927C40.4051 25.2804 39.4724 25.6667 38.5 25.6667H38.335C37.745 25.669 37.1687 25.8438 36.6768 26.1696C36.1849 26.4953 35.799 26.9578 35.5666 27.5Z" fill="var(--light-grey)" />
                <path d="M22 30C26.4183 30 30 26.4183 30 22C30 17.5817 26.4183 14 22 14C17.5817 14 14 17.5817 14 22C14 26.4183 17.5817 30 22 30Z" fill={theme.dark}/>
            </svg>
        )
    }

    const LinkTile: FunctionComponent<LinkTileProps> = ({ routeName }) => {
        
        console.log(pathname)

        return (
            <Link href={`/active-routine/${routeName}`}>
                <Flex w="75px" h="75px" bgColor={theme.light} borderRadius="md" boxShadow={pathname === `/active-routine/${routeName}` ? "0px 4px 4px var(--de-orange)" : "unset"}>

                </Flex>
            </Link>
        )
    }

    return (
        <Flex id='account-nav-bar' as='header' h="100%" minW="100px" border="1px solid var(--de-orange)" maxW="200px" pos="relative" flexDir="column" align="center" justify="space-between" py="0.75rem" overflow="hidden" borderRadius="md">
            <Flex flexDir="column" gap="1rem" align="center" justify="center">
                <Image src="/logo.png" priority={true} alt="logo-image" width={150} height={150} className="animate-logo-spin" />
                <LinkTile routeName="rituals" />
                <LinkTile routeName="goals" />
                <LinkTile routeName="/" />
            </Flex>
            <Flex id="right-hand-nav-container" mb="1rem" align="flex-end" gap="1rem">
                <ThemeSelector isVertical={true} />
                <Settings />             
            </Flex>
            {showAccountForm && <Flex id="account-form-container" pos="absolute" flexDir="column" align="center" w="80%" bgColor={theme.light} bottom="5rem" left="1rem" border="1px solid" borderColor="brand.500" borderRadius="md" p="1rem">
                    <Link href="/account">Account</Link>
                    <form action="/auth/signout" method="post">
                        <Button type="submit" variant="outline">
                            Sign out
                        </Button>
                    </form>
            </Flex>}
        </Flex>
           
    )
}