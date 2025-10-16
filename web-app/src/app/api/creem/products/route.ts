import { NextRequest, NextResponse } from 'next/server';

const CREEM_API_BASE = 'https://api.creem.io';

interface CreemError {
  error?: string;
  message?: string;
}

async function fetchProduct(id: string, apiKey: string) {
  const response = await fetch(
    `${CREEM_API_BASE}/v1/products?product_id=${encodeURIComponent(id)}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    let message = `Unable to fetch product ${id}`;
    try {
      const payload = (await response.json()) as CreemError;
      if (payload?.error || payload?.message) {
        message = payload.error ?? payload.message ?? message;
      }
    } catch {
      // noop on JSON parse failure.
    }

    return { error: message, id };
  }

  const product = await response.json();
  return { product };
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'CREEM_API_KEY 未配置，无法同步价格 · CREEM_API_KEY is missing. Please add it to the server environment.',
      },
      { status: 500 },
    );
  }

  const idsParam = request.nextUrl.searchParams.get('ids') ?? '';
  const ids = idsParam
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (ids.length === 0) {
    return NextResponse.json({ products: [] });
  }

  const results = await Promise.all(ids.map((id) => fetchProduct(id, apiKey)));

  const products = results
    .map((item) => ('product' in item ? item.product : null))
    .filter(Boolean);
  const errors = results
    .map((item) => ('error' in item ? { id: item.id, message: item.error } : null))
    .filter(Boolean);

  return NextResponse.json({ products, errors });
}
