import { NextResponse } from 'next/server'

import { getSupabaseServerClient } from '../../../lib/supabase/serverClient'

export async function GET(request: Request) {
  const supabase = getSupabaseServerClient()
  const requestUrl = new URL(request.url)
  const redirectTo = new URL('/auth/callback', requestUrl.origin).toString()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
      scopes: 'read:user user:email',
    },
  })

  if (error || !data.url) {
    const errorUrl = new URL('/', requestUrl.origin)
    errorUrl.searchParams.set('authError', 'github-signin-failed')
    if (error?.message) {
      errorUrl.searchParams.set('authMessage', error.message)
    }
    return NextResponse.redirect(errorUrl)
  }

  return NextResponse.redirect(data.url)
}

