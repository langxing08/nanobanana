import { NextResponse } from 'next/server'

import { getSupabaseServerClient } from '../../../../lib/supabase/serverClient'

export async function GET() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log('[api/auth/session] user lookup result', {
    hasUser: Boolean(user),
    errorMessage: error?.message,
  })

  if (error) {
    return NextResponse.json({ user: null, error: error.message }, { status: 401 })
  }

  return NextResponse.json({ user })
}
