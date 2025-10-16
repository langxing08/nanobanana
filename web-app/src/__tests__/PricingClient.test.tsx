import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import PricingClient from '../app/pricing/PricingClient';
import { PRICING_PLANS } from '../lib/pricingConfig';

describe('PricingClient', () => {
  const originalLocation = window.location;
  const originalFetch = global.fetch;
  let fetchMock: jest.Mock;
  const originalProductIds = PRICING_PLANS.map((plan) => plan.price.creemProductId);

  const renderPricing = async () => {
    const view = render(<PricingClient />);
    await act(async () => {
      await Promise.resolve();
    });
    return view;
  };

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: 'http://localhost/pricing' },
    });
  });

  beforeEach(() => {
    PRICING_PLANS[0].price.creemProductId = 'prod_basic_yearly';

    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    } as unknown as Response);
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    fetchMock.mockReset();
    (window.location as { href: string }).href = 'http://localhost/pricing';
    PRICING_PLANS.forEach((plan, index) => {
      plan.price.creemProductId = originalProductIds[index] ?? null;
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('renders configured plans with Chinese copy', async () => {
    await renderPricing();

    expect(screen.getByText('Basic 基础版')).toBeInTheDocument();
    expect(screen.getByText('Pro 专业版')).toBeInTheDocument();
    expect(screen.getByText('Max 旗舰版')).toBeInTheDocument();
  });

  it('redirects to checkout when Creem session is created', async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();

      if (url.includes('/api/creem/products')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            products: [
              { id: 'prod_basic_yearly', price: 14400, currency: 'USD' },
            ],
          }),
        } as unknown as Response);
      }

      if (url.includes('/api/creem/checkout')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            checkout_url: 'https://checkout.creem.test/session',
          }),
        } as unknown as Response);
      }

      return Promise.reject(new Error(`Unhandled fetch call: ${url}`));
    });

    await renderPricing();

    const ctaButton = await screen.findByRole('button', {
      name: /立即启用 Basic/,
    });

    await act(async () => {
      fireEvent.click(ctaButton);
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/creem/checkout',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    await waitFor(() => {
      expect((window.location as { href: string }).href).toBe(
        'https://checkout.creem.test/session',
      );
    });
  });

  it('显示错误信息当无法创建支付链接时', async () => {
    PRICING_PLANS[2].price.creemProductId = null;

    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();

      if (url.includes('/api/creem/products')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ products: [] }),
        } as unknown as Response);
      }

      if (url.includes('/api/creem/checkout')) {
        return Promise.resolve({
          ok: false,
          json: async () => ({ error: '缺少 Creem 产品 ID，请在环境变量中配置对应套餐的产品标识。' }),
        } as unknown as Response);
      }

      return Promise.reject(new Error(`Unhandled fetch call: ${url}`));
    });

    await renderPricing();

    const contactButton = screen.getByRole('button', {
      name: /立即启用 Max/,
    });

    await act(async () => {
      fireEvent.click(contactButton);
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/creem/checkout',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText('缺少 Creem 产品 ID，请在环境变量中配置对应套餐的产品标识。'),
      ).toBeInTheDocument();
    });
  });

  afterAll(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete (global as { fetch?: unknown }).fetch;
    }
  });
});
