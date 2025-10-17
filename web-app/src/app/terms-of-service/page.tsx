import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nano Banana 服务条款',
  description:
    '阅读 Nano Banana 的服务条款，了解使用规范、计费政策、退款与终止条款，确保满足 Creem 的商户合规要求。',
};

const CLAUSES = [
  {
    title: '1. 服务范围',
    items: [
      'Nano Banana 提供基于浏览器的 AI 图像编辑工具，包括图生图、文生图与批量生成能力。',
      '我们仅授权您在遵守法律与本条款的前提下，将生成内容用于合法的商业或个人项目。',
    ],
  },
  {
    title: '2. 账户与安全',
    items: [
      '您需确保账号信息准确，并妥善保管登录凭据。若发现异常登录，请立即通知我们。',
      '我们保留在发现滥用、违规或欺诈行为时暂停或终止服务的权利。',
    ],
  },
  {
    title: '3. 付款与续订',
    items: [
      '所有付费订单通过 Creem 结算。Creem 将作为 Merchant of Record 出具账单并处理合规税务。',
      '订阅方案默认年付，可在到期前随时取消续订，取消后当前计费周期内的功能仍然可用。',
    ],
  },
  {
    title: '4. 退款政策',
    items: [
      '如需退款，请在购买后 7 日内联系 hello@nanobanana.ai 并说明原因。我们会与 Creem 协调处理。',
      '若已大量使用生成额度或存在滥用行为，可能无法提供退款。',
    ],
  },
  {
    title: '5. 内容使用与限制',
    items: [
      '禁止上传或生成违反法律法规、侵权、仇恨或成人内容的素材。',
      '您需对自行上传的素材拥有合法权利；我们会配合权利人依法处理侵权投诉。',
    ],
  },
  {
    title: '6. 免责声明',
    items: [
      '在法律允许范围内，Nano Banana 按“现状”提供服务，我们不对生成内容的准确性或适用性做出保证。',
      '对于因不可抗力、第三方服务故障或用户自身原因导致的损失，我们不承担连带责任。',
    ],
  },
  {
    title: '7. 条款更新',
    items: [
      '我们可能根据业务或法律要求更新本条款。更新后将在网站显著位置提示，并通过邮件通知付费用户。',
    ],
  },
  {
    title: '8. 联系方式',
    items: ['如对条款有疑问或异议，请发送邮件至 hello@nanobanana.ai，我们将在 2 个工作日内回复。'],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-white to-white pb-24">
      <section className="section pt-20">
        <div className="section-inner max-w-3xl text-[#1f2937]">
          <p className="text-sm font-semibold text-[#d97706]">Nano Banana</p>
          <h1 className="mt-3 text-3xl font-extrabold">服务条款</h1>
          <p className="mt-4 text-sm leading-6 text-[#4b5563]">
            最近更新：{new Date().toLocaleDateString('zh-CN')}。请仔细阅读本条款，以了解使用 Nano Banana 服务的权利与义务。
          </p>
          <p className="mt-4 text-sm leading-6 text-[#4b5563]">
            使用本服务即表示您同意遵守这些规则。如不同意全部内容，请立即停止使用 Nano Banana。
          </p>

          <div className="mt-8 space-y-8">
            {CLAUSES.map((clause) => (
              <section key={clause.title} className="rounded-3xl border border-[#fde8b5] bg-white/80 p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-[#1f2937]">{clause.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
                  {clause.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-[#fde8b5] bg-white/80 p-6 text-sm leading-6 text-[#4b5563] shadow-soft">
            <p>
              了解我们如何处理个人信息，请阅读{' '}
              <Link className="font-semibold text-[#d97706] hover:underline" href="/privacy-policy">
                隐私政策
              </Link>
              。若条款与隐私政策存在冲突，以更严格保护用户权益的条款为准。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
