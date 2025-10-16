import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Nano Banana 套餐定价',
  description: '选择适合个人或团队的 Nano Banana 套餐，解锁 AI 角色创作、LoRA 上传与高速渲染服务。',
};

export default function PricingPage() {
  return <PricingClient />;
}
