'use client';

import { useEffect, useState } from 'react';
import type { PricingPlan } from '../../lib/pricingConfig';
import { PRICING_PLANS } from '../../lib/pricingConfig';

type CheckoutState = string | null;

interface CreemProduct {
  id: string;
  price: number;
  currency: string;
}

interface ProductsResponse {
  products: CreemProduct[];
  errors?: { id: string; message: string }[];
}

const FAQS = [
  {
    question: '可以随时取消订阅吗？',
    answer: '是的，所有方案采用年度扣费，但可立即停止续费并保留当期使用权限。',
  },
  {
    question: 'Creem 支付是否安全？',
    answer: 'Creem 提供 PCI DSS 级别的加密，并支持 3D Secure 与 Apple Pay。',
  },
  {
    question: '十月上线的新功能如何体验？',
    answer: 'Pro 与 Max 用户将在功能发布后自动解锁，无需额外付费。',
  },
];

function clonePlans(plans: PricingPlan[]): PricingPlan[] {
  return plans.map((plan) => ({
    ...plan,
    price: { ...plan.price },
    creditsHighlight: { ...plan.creditsHighlight },
    features: plan.features.map((feature) => ({ ...feature })),
  }));
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export default function PricingClient() {
  const [plans, setPlans] = useState(() => clonePlans(PRICING_PLANS));
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [pendingCheckout, setPendingCheckout] = useState<CheckoutState>(null);

  useEffect(() => {
    const ids = Array.from(
      new Set(
        PRICING_PLANS.map((plan) => plan.price.creemProductId).filter(
          (id): id is string => Boolean(id),
        ),
      ),
    );

    if (ids.length === 0) {
      return;
    }

    let cancelled = false;
    const fetchProducts = async () => {
      setIsLoadingPrices(true);
      setPricingError(null);

      try {
        const response = await fetch(`/api/creem/products?ids=${ids.join(',')}`, {
          cache: 'no-store',
        });
        const payload = (await response.json()) as ProductsResponse;

        if (!response.ok) {
          throw new Error(
            (payload as { error?: string })?.error ??
              '无法同步价格，请稍后重试。',
          );
        }

        if (cancelled) {
          return;
        }

        const map = new Map<string, CreemProduct>();
        payload.products?.forEach((product) => {
          map.set(product.id, product);
        });

        setPlans((prev) =>
          prev.map((plan) => {
            const price = plan.price;
            if (!price.creemProductId) {
              return plan;
            }

            const product = map.get(price.creemProductId);
            if (!product) {
              return plan;
            }

            const amount = product.price / 100;
            return {
              ...plan,
              price: {
                ...price,
                amount,
                currency: product.currency ?? price.currency,
                label: `${formatCurrency(amount, product.currency ?? price.currency)} /年`,
              },
            };
          }),
        );

        if (payload.errors?.length) {
          setPricingError('部分价目无法自动同步，请稍后重试。');
        }
      } catch (error) {
        if (!cancelled) {
          setPricingError((error as Error)?.message ?? '无法同步价格，请稍后重试。');
        }
      } finally {
        if (!cancelled) {
          setIsLoadingPrices(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const onCheckout = async (planId: string) => {
    const currentPlan = plans.find((plan) => plan.id === planId);
    if (!currentPlan) {
      return;
    }

    const price = currentPlan.price;

    setCheckoutError(null);
    setPendingCheckout(planId);

    try {
      const checkoutPayload: Record<string, unknown> = {
        planId,
        billingCycle: 'yearly',
        requestId: `${planId}-yearly-${Date.now()}`,
      };

      if (price.creemProductId) {
        checkoutPayload.productId = price.creemProductId;
      }

      const response = await fetch('/api/creem/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? '支付链接暂时不可用，请稍后重试。');
      }

      const redirectUrl = payload?.checkoutUrl ?? payload?.checkout_url;
      if (!redirectUrl) {
        throw new Error('缺少支付链接，请联系团队支持。');
      }

      window.location.href = redirectUrl as string;
    } catch (error) {
      setCheckoutError((error as Error)?.message ?? '支付链接暂时不可用，请稍后重试。');
    } finally {
      setPendingCheckout(null);
    }
  };

  return (
    <main className="pb-24 bg-gradient-to-b from-[#fff8ea] via-white to-white">
      <section className="section pt-16 md:pt-24">
        <div className="section-inner flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="capsule-yellow px-5 py-2 text-sm">
            年度会员套餐
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1f2937] leading-tight">
              选择最贴合创作节奏的年度积分计划
            </h1>
            <p className="text-lg text-[#4b5563] leading-relaxed">
              全部方案均包含商用授权、随时取消以及 Creem 安全支付。
            </p>
          </div>
          {pricingError ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
              {pricingError}
            </p>
          ) : null}
          {isLoadingPrices ? (
            <p className="text-sm text-[#4b5563]">正在同步最新价格…</p>
          ) : null}
        </div>
      </section>

      <section className="section mt-12 md:mt-16">
        <div className="section-inner">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const isPending = pendingCheckout === plan.id;
              const isEmphasized = Boolean(plan.emphasize);

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col gap-6 justify-between rounded-3xl border bg-white/95 p-6 md:p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-lg ${
                    isEmphasized
                      ? 'border-2 border-[#f97316] shadow-lg bg-white'
                      : 'border border-[#f5e9d8]'
                  }`}
                >
                  {plan.badge ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span
                        className={`rounded-pill px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white ${
                          isEmphasized
                            ? 'bg-gradient-to-r from-[#f97316] to-[#facc15]'
                            : 'bg-[#f59e0b]'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  ) : null}
                  <div className="space-y-4 text-left">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#1f2937]">{plan.name}</h2>
                      <p className="text-sm text-[#6b7280] mt-1">{plan.headline}</p>
                      {plan.description ? (
                        <p className="text-xs text-[#9ca3af] mt-1">{plan.description}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-semibold text-[#1f2937]">
                        {plan.price.label}
                      </div>
                      {plan.price.subLabel ? (
                        <p className="text-sm text-[#6b7280]">{plan.price.subLabel}</p>
                      ) : null}
                    </div>
                    <div
                      className={`rounded-2xl border px-5 py-4 text-center ${
                        isEmphasized
                          ? 'bg-gradient-to-r from-[#fff2d6] to-[#ffe5b0] border-[#fed7aa]'
                          : 'bg-gradient-to-r from-[#fff5e6] to-[#fef6eb] border-[#fee8cc]'
                      }`}
                    >
                      <p className="text-xl font-semibold text-[#b45309]">
                        {plan.creditsHighlight.title}
                      </p>
                      <p className="text-xs text-[#9a6b25] mt-1">{plan.creditsHighlight.subtitle}</p>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.label} className="flex items-start gap-2 text-sm text-[#374151]">
                          <span
                            className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                              feature.comingSoon
                                ? 'bg-[#fcd34d] text-[#92400e]'
                                : 'bg-[#34d399] text-white'
                            } text-[0.65rem] font-semibold`}
                          >
                            {feature.comingSoon ? '⏱' : '✓'}
                          </span>
                          <span
                            className={feature.comingSoon ? 'text-[#b45309]' : ''}
                          >
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => onCheckout(plan.id)}
                      disabled={isPending}
                      className={`w-full rounded-pill px-5 py-3 text-sm font-medium transition ${
                        isEmphasized
                          ? 'bg-gradient-to-r from-[#f97316] to-[#facc15] text-white hover:brightness-105'
                          : 'border border-[#d7d3c3] text-[#1f2937] bg-white hover:border-[#f97316]'
                      } ${isPending ? 'opacity-80 cursor-wait' : ''}`}
                    >
                      {isPending ? '正在创建支付链接…' : plan.callToActionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {checkoutError ? (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {checkoutError}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section mt-20 md:mt-24">
        <div className="section-inner space-y-10">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-semibold text-[#1f2937]">常见问题</h3>
            <p className="text-sm text-[#6b7280]">
              如果找不到答案，欢迎写信至 hello@nanobanana.ai
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {FAQS.map((item) => (
              <div key={item.question} className="card px-6 py-5 space-y-2 bg-white/95">
                <h4 className="text-lg font-semibold text-[#1f2937]">{item.question}</h4>
                <p className="text-sm text-[#4b5563] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
