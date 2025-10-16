import { NextRequest, NextResponse } from 'next/server';

const CREEM_API_BASE = 'https://api.creem.io';

interface CheckoutRequestBody {
  productId?: string;
  requestId?: string;
  units?: number;
  successUrl?: string;
  discountCode?: string;
  metadata?: Record<string, unknown>;
  billingCycle?: string;
  planId?: string;
  customer?: {
    id?: string;
    email?: string;
  };
}

interface CreemError {
  error?: string;
  message?: string;
}

const PLAN_PRODUCT_ID_MAP: Record<string, string | undefined> = {
  basic: process.env.CREEM_PRODUCT_BASIC_YEARLY,
  pro: process.env.CREEM_PRODUCT_PRO_YEARLY,
  max: process.env.CREEM_PRODUCT_MAX_YEARLY,
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'CREEM_API_KEY 未配置，无法创建支付会话 · CREEM_API_KEY is missing on the server.',
      },
      { status: 500 },
    );
  }

  let payload: CheckoutRequestBody;
  try {
    payload = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json(
      { error: '请求体无法解析 · Unable to parse request payload.' },
      { status: 400 },
    );
  }

  if (!payload.productId && !payload.planId) {
    return NextResponse.json(
      { error: '缺少 productId 或 planId，无法创建支付会话。' },
      { status: 400 },
    );
  }

  const resolvedProductId =
    payload.productId ?? (payload.planId ? PLAN_PRODUCT_ID_MAP[payload.planId] : undefined);

  if (!resolvedProductId) {
    return NextResponse.json(
      {
        error:
          '缺少 Creem 产品 ID，请在环境变量中配置对应套餐的产品标识。',
      },
      { status: 400 },
    );
  }

  const requestId =
    payload.requestId ??
    `checkout-${payload.planId ?? payload.productId}-${payload.billingCycle ?? 'single'}-${Date.now()}`;

  const checkoutBody: Record<string, unknown> = {
    product_id: resolvedProductId,
    request_id: requestId,
  };

  if (payload.units) {
    checkoutBody.units = payload.units;
  }

  if (payload.discountCode) {
    checkoutBody.discount_code = payload.discountCode;
  }

  if (payload.successUrl) {
    checkoutBody.success_url = payload.successUrl;
  }

  if (payload.metadata && Object.keys(payload.metadata).length > 0) {
    checkoutBody.metadata = payload.metadata;
  }

  if (payload.customer && (payload.customer.email || payload.customer.id)) {
    checkoutBody.customer = {
      ...payload.customer,
    };
  }

  const response = await fetch(`${CREEM_API_BASE}/v1/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    cache: 'no-store',
    body: JSON.stringify(checkoutBody),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      (result as CreemError)?.error ??
      (result as CreemError)?.message ??
      'Creem checkout creation failed';

    return NextResponse.json(
      {
        error: `${errorMessage} · Creem checkout creation failed.`,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    checkout: result,
    checkoutUrl: result?.checkout_url,
  });
}
