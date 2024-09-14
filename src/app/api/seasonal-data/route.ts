import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";


// export async function POST(request: Request) {
//     const newGoal = await request.json()
//     const supabase = createClient();

//     const { data, error } = await supabase.from('Seasonal_Goals')
//         .insert(newGoal)
//         .select()
//         .single()

//         if (error) {
//             console.error('Supabase Error:', error);  // Log the error
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         }
    
//         return NextResponse.json( data , { status: 201 })
// }

export async function PUT(request: Request) {
        const updatedGoal = await request.json();
        const supabase = createClient();
    
        const { data, error } = await supabase.from('Seasonal_Data')
            .update({
               ...updatedGoal
            })
            .eq('id', updatedGoal.id)
            .select()
            .single()
    
            if (error) {
                console.error('Supabase Error:', error);  // Log the error
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json( data , { status: 201 })
    }

    // export async function DELETE(request: Request) {
    //     const id = await request.json()
    //     const supabase = createClient()
    
    //     const { data, error } = await supabase.from('Seasonal_Goals')
    //         .delete()
    //         .eq('id', id)
    
    //     if (error) {
    //         console.error('Supabase Error:', error);  // Log the error
    //         return NextResponse.json({ error: error.message }, { status: 500 });
    //     }
    //     return NextResponse.json({ status: 204 })
    // }