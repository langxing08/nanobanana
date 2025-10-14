import { NextResponse } from 'next/server'

import { getSupabaseServerClient } from '../../../../lib/supabase/serverClient'

export async function POST() {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

