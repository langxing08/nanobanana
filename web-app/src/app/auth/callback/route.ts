import { NextResponse } from 'next/server'

import { getSupabaseServerClient } from '../../../lib/supabase/serverClient'

export async function GET(request: Request) {
  const supabase = getSupabaseServerClient()
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectPath = requestUrl.searchParams.get('next') ?? '/'

  const resolvedRedirectPath =
    typeof redirectPath === 'string' && redirectPath.startsWith('/') ? redirectPath : '/'

  if (!code) {
    const errorCode = requestUrl.searchParams.get('error') ?? 'missing_code'
    const redirectUrl = new URL(resolvedRedirectPath, requestUrl.origin)
    redirectUrl.searchParams.set('authError', errorCode)
    return NextResponse.redirect(redirectUrl)
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    const redirectUrl = new URL('/', requestUrl.origin)
    redirectUrl.searchParams.set('authError', 'exchange-failed')
    redirectUrl.searchParams.set('authMessage', error.message)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.redirect(new URL(resolvedRedirectPath, requestUrl.origin))
}
