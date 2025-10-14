import { NextResponse } from 'next/server'

import { getSupabaseServerClient } from '../../../lib/supabase/serverClient'

export async function GET(request: Request) {
  const supabase = getSupabaseServerClient()
  const requestUrl = new URL(request.url)
  const redirectTo = new URL('/auth/callback', requestUrl.origin).toString()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        // Request offline access to allow refresh tokens.
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error || !data.url) {
    const errorUrl = new URL('/', requestUrl.origin)
    errorUrl.searchParams.set('authError', 'google-signin-failed')
    if (error?.message) {
      errorUrl.searchParams.set('authMessage', error.message)
    }
    return NextResponse.redirect(errorUrl)
  }

  return NextResponse.redirect(data.url)
}

