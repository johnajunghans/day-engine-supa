import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";


export async function POST(request: Request) {
    const instances = await request.json()
    const supabase = createClient();

    const { data, error } = await supabase.from('Ritual_Instances')
        .insert(instances)
        .select()
        .single()

        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
        return NextResponse.json( data, { status: 201 })
}

export async function PUT(request: Request) {
        const updatedInstance = await request.json();
        const supabase = createClient();
    
        const { data, error } = await supabase.from('Ritual_Instances')
            .update({
                ...(updatedInstance.start_time && { start_time: updatedInstance.start_time }),
                ...(updatedInstance.end_time && { end_time: updatedInstance.end_time })
            })
            .eq('id', updatedInstance.id)
            .select()
            .single()
    
            if (error) {
                console.error('Supabase Error:', error);  // Log the error
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json( data, { status: 201 })
    }

    export async function DELETE(request: Request) {
        const id = await request.json()
        const supabase = createClient()
    
        const { error } = await supabase.from('Ritual_Instances')
            .delete()
            .eq('id', id)
    
        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ status: 204 })
    }