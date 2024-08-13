import Main from "./main";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";


export default async function ActiveRoutine() {

    // Create instance of Supabase
    const supabase = createClient()

    // Protect route by redirecting back to home page if no user is logged in
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }
    
    return <Main />
}