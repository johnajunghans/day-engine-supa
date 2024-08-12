'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../../../utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'
import { Button, Flex, Input } from '@chakra-ui/react'
import { useThemeContext } from '../hooks/useThemeContext'
import Link from 'next/link'


export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
//   const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const { theme } = useThemeContext()

  const getProfile = useCallback(async () => {

    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        // setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
    //   alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    // website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        // website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
    //   alert('Profile updated!')
    } catch (error) {
    //   alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex id='account-form-bg' bgColor={theme.light} minH="100vh" align="center" justify="center">
        <Link href="/active-routine" className='absolute top-4 left-4 text-xl'>⬅</Link>
        <Flex className="account-form" flexDir="column" align="center" gap="0.5rem" h="50%" w="33%" minW="400px" minH="400px" p="2rem" borderRadius="md" border="1px solid" borderColor="brand.500" bgColor={theme.dark}>
            <Avatar
                uid={user?.id ?? null}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ fullname, username, avatar_url: url })
                }}
            />
            {/* <label htmlFor="email">Email</label> */}
            <Input 
                id="email" w="80%"
                type="text" 
                value={user?.email} 
                disabled  />
            <Input id="fullName"
                variant="primary"
                w="80%"
                type="text"
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)} 
                placeholder='Full Name' />
            <Input id="username" w="80%"
                
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username' />
            <Button className="button primary block" w="80%"
                onClick={() => updateProfile({ fullname, username, avatar_url })}
                disabled={loading}>
                {loading ? 'Loading ...' : 'Update'}
            </Button>

        <div>
            <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline">
                Sign out
            </Button>
            </form>
        </div>
        </Flex>
    </Flex>
  )
}