import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nano Banana 隐私政策',
  description:
    '了解 Nano Banana 如何收集、使用与存储您的个人信息。我们遵循数据最小化原则并依靠 Creem 提供的支付安全保障。',
};

const SECTIONS = [
  {
    title: '1. 信息收集',
    body: [
      '当您创建账号或使用 Nano Banana 服务时，我们会收集必要的注册信息（邮箱、昵称）以完成登录和提供云端保存功能。',
      'Creem 作为收款方会处理账单与税务信息（如姓名、退款记录）。我们不会直接保存完整的支付卡信息。',
    ],
  },
  {
    title: '2. 信息使用',
    body: [
      '用于提供 AI 图像编辑功能、保存生成历史、改进模型表现，并保障账号安全与滥用检测。',
      '向您发送与账户相关的通知，例如异常登录提醒、账单更新或功能变更。',
    ],
  },
  {
    title: '3. 信息共享',
    body: [
      '我们仅与经审查的服务商合作，包括 Creem（支付）、Supabase（身份认证）与云存储供应商，所有服务商均受保密义务约束。',
      '若法律法规或政府主管部门依法要求披露，我们会在符合法定程序的前提下提供必要信息。',
    ],
  },
  {
    title: '4. 数据保留与删除',
    body: [
      '账户信息将在您账号存在期间保存，若连续 12 个月未使用会进行匿名化处理。',
      '您可通过 hello@nanobanana.ai 请求删除账户与相关数据；支付凭据需按税务法规在法定期限内保留。',
    ],
  },
  {
    title: '5. 您的权利',
    body: [
      '访问、导出或更正您的个人资料。',
      '撤回营销订阅、停用账号或请求删除生成内容。',
    ],
  },
  {
    title: '6. 儿童与敏感数据',
    body: [
      'Nano Banana 不针对 16 岁以下的未成年人提供服务，也不会主动收集此类用户的信息。',
      '请勿上传包含个人敏感信息的素材；我们会自动检测并阻止违规内容。',
    ],
  },
  {
    title: '7. 联系方式',
    body: [
      '如果您对本隐私政策或数据处理方式有任何疑问，请通过 hello@nanobanana.ai 与我们联系。',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-white to-white pb-24">
      <section className="section pt-20">
        <div className="section-inner max-w-3xl text-[#1f2937]">
          <p className="text-sm font-semibold text-[#d97706]">Nano Banana</p>
          <h1 className="mt-3 text-3xl font-extrabold">隐私政策</h1>
          <p className="mt-4 text-sm leading-6 text-[#4b5563]">
            最近更新：{new Date().toLocaleDateString('zh-CN')}。我们致力于保护用户隐私，并符合 Creem 的商户合规要求。
          </p>
          <p className="mt-4 text-sm leading-6 text-[#4b5563]">
            当您使用 Nano Banana（以下简称“我们”）提供的 AI 图像编辑服务时，即表示您已阅读并同意本隐私政策的内容。
          </p>

          <div className="mt-8 space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title} className="rounded-3xl border border-[#fde8b5] bg-white/80 p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-[#1f2937]">{section.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
                  {section.body.map((paragraph) => (
                    <li key={paragraph} className="flex items-start gap-2">
                      <span aria-hidden>•</span>
                      <span>{paragraph}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-[#fde8b5] bg-white/80 p-6 text-sm leading-6 text-[#4b5563] shadow-soft">
            <p>
              如需了解更多，请阅读我们的{' '}
              <Link className="font-semibold text-[#d97706] hover:underline" href="/terms-of-service">
                服务条款
              </Link>
              。我们会在政策发生重大变更时，通过站内通知或电子邮件提醒您。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
