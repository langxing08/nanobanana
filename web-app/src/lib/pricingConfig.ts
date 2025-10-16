export interface PlanPrice {
  amount: number;
  currency: string;
  label: string;
  subLabel?: string;
  creemProductId?: string | null;
}

export interface PricingPlan {
  id: string;
  name: string;
  headline: string;
  description?: string;
  badge?: string;
  emphasize?: boolean;
  creditsHighlight: {
    title: string;
    subtitle: string;
  };
  features: { label: string; comingSoon?: boolean }[];
  footnote?: string;
  callToActionLabel: string;
  price: PlanPrice;
}

const {
  NEXT_PUBLIC_CREEM_PRODUCT_BASIC_YEARLY,
  NEXT_PUBLIC_CREEM_PRODUCT_PRO_YEARLY,
  NEXT_PUBLIC_CREEM_PRODUCT_MAX_YEARLY,
} = process.env;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic 基础版',
    headline: '适合起步创作者',
    description: '年度订阅，可按需随时取消。',
    creditsHighlight: {
      title: '1,800 积分',
      subtitle: '≈ 每月 75 张高品质图像',
    },
    features: [
      { label: '每年 1,800 积分' },
      { label: '每月 75 张高质量图像' },
      { label: '基础 AI 模型' },
      { label: '标准客服支持' },
      { label: '包含商用授权' },
      { label: '随时取消' },
    ],
    callToActionLabel: '立即启用 Basic',
    price: {
      amount: 144,
      currency: 'USD',
      label: '$144 /年',
      subLabel: '年度扣费',
      creemProductId: NEXT_PUBLIC_CREEM_PRODUCT_BASIC_YEARLY ?? null,
    },
  },
  {
    id: 'pro',
    name: 'Pro 专业版',
    headline: '人气之选，为创作者加速',
    badge: '最受欢迎',
    emphasize: true,
    description: '年度订阅，享受优先客服与资源。',
    creditsHighlight: {
      title: '9,600 积分',
      subtitle: '≈ 每月 400 张高品质图像',
    },
    features: [
      { label: '每年 9,600 积分' },
      { label: '每月 400 张高质量图像' },
      { label: '高级模型权限' },
      { label: '优先客服响应' },
      { label: '批量生成能力' },
      { label: '包含商用授权' },
      { label: '随时取消' },
      { label: '图像编辑工具（十月上线）', comingSoon: true },
    ],
    callToActionLabel: '立即启用 Pro',
    price: {
      amount: 234,
      currency: 'USD',
      label: '$234 /年',
      subLabel: '年度扣费',
      creemProductId: NEXT_PUBLIC_CREEM_PRODUCT_PRO_YEARLY ?? null,
    },
  },
  {
    id: 'max',
    name: 'Max 旗舰版',
    headline: '为高阶团队打造',
    description: '极速渲染与专属成功顾问随行。',
    creditsHighlight: {
      title: '19,200 积分',
      subtitle: '≈ 每月 800 张高品质图像',
    },
    features: [
      { label: '每年 19,200 积分' },
      { label: '每月 800 张高质量图像' },
      { label: '极速渲染通道' },
      { label: '专属客户成功顾问' },
      { label: '优先排队通道' },
      { label: '包含商用授权' },
      { label: '随时取消' },
      { label: '专业编辑套件（十月上线）', comingSoon: true },
    ],
    callToActionLabel: '立即启用 Max',
    price: {
      amount: 480,
      currency: 'USD',
      label: '$480 /年',
      subLabel: '年度扣费',
      creemProductId: NEXT_PUBLIC_CREEM_PRODUCT_MAX_YEARLY ?? null,
    },
  },
];
