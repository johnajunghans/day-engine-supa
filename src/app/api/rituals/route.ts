
import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

// POST: add new ritual
export async function POST(request: Request) {
    const rituals = await request.json()
    const supabase = createClient();

    console.log('attempting to create ritual')

    const { data, error } = await supabase.from('Rituals')
        .insert(rituals)

        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ data }, { status: 201 })
}

// PUT: update a ritual
export async function PUT(request: Request) {
    const updatedRitual = await request.json();
    const supabase = createClient();

    const { data, error } = await supabase.from('Rituals')
        .update({
            // conditionally add name and description if they are there 
            ...(updatedRitual.name && {name: updatedRitual.name}),
            ...(updatedRitual.description && {description: updatedRitual.description})
        })
        .eq('id', updatedRitual.id)
        .select()

        if (error) {
            console.error('Supabase Error:', error);  // Log the error
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.log(updatedRitual, data)
        return NextResponse.json({ data }, { status: 201 })
}

// DELETE: delete a ritual
export async function DELETE(request: Request) {

}