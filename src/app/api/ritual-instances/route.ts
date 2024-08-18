import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";


export async function POST(request: Request) {
    const instance = await request.json()
    const supabase = createClient();

    const { data, error } = await supabase.from('Ritual_Instances')
        .insert(instance)

        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ data }, { status: 201 })
}

export async function PUT(request: Request) {
        const updatedInstance = await request.json();
        const supabase = createClient();
    
        const { data, error } = await supabase.from('Rituals')
            .update({
                ...updatedInstance
            })
            .eq('id', updatedInstance.id)
            .select()
    
            if (error) {
                console.error('Supabase Error:', error);  // Log the error
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json({ data }, { status: 201 })
    }

    export async function DELETE(request: Request) {
        const id = await request.json()
        const supabase = createClient()
    
        const { data, error } = await supabase.from('Ritual_Instances')
            .delete()
            .eq('id', id)
    
        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data }, { status: 204 })
    }