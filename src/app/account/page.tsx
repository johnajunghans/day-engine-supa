import AccountForm from './account-form'
import { createClient } from '../../../utils/supabase/server'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from './navbar'
import Main from './main'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Navbar user={user} />
      <Main />
    </>
    // <AccountForm user={user} />
  )
}