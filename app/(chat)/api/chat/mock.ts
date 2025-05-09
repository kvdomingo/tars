import type { DBMessage } from '@/lib/db/schema';

export const mockContent = `
Based on my research, :ingredient[hyaluronic acid]{id="2e4ca9e9-9740-4743-8df4-656aa233559c"} is one of the most effective hydrating ingredients
in skincare. It can hold up to 1000 times its weight in water, making it excellent for all skin types,
especially dehydrated skin. Products containing hyaluronic acid have shown significant increases in
skin hydration levels within 2-4 weeks of consistent use.

For best results, apply hyaluronic acid serums to slightly damp skin and follow with a moisturizer to
lock in hydration. :brand[The Ordinary's]{id="ad8bf73b-b8c2-4366-a496-fafc1c2d4f81"} :product[Niacinamide 10% + Zinc 1%]{id="d7e08baf-6b69-46ab-8052-ee1f4de8bf0d"} is a popular and affordable
option that pairs well with hyaluronic acid, while higher-end alternatives like :brand[Drunk Elephant's]{id="a9e34c23-6a62-4bab-b28c-862a19ffd60b"}
:product[C-Firma Fresh Day Serum]{id="9e93f5ae-abce-4edb-a6b0-dd120817d78e"} show excellent clinical results.

According to allure.com, hyaluronic acid works best when combined with other hydrating ingredients
like glycolic acid and :ingredient[niacinamide]{id="a850dec3-fd01-48a0-aaa5-7f347e46bea3"}. The combination helps to both attract moisture and
strengthen the skin barrier, preventing water loss. Dermstore.com recommends using products with
different molecular weights of hyaluronic acid for deeper penetration.

Market trends show that face serums containing hyaluronic acid have seen a +15.8% increase in search
volume year-over-year. This growing interest reflects consumer awareness of the ingredient's benefits.
Brands like The Ordinary and :brand[CeraVe]{id="8e07f246-4321-4add-bef9-dc5aeff21f4a"} have capitalized on this trend with affordable, effective
formulations.

For those with sensitive skin, CeraVe's :product[Hydrating Cleanser]{id="a2bdeaa8-2152-4238-9433-fa21c0708ea1"} provides a gentle way to incorporate
hyaluronic acid into your routine. Those looking for more intensive treatment might consider peptide-
infused formulations, which according to Vogue.com, can enhance the moisture-binding effects of
hyaluronic acid while providing additional anti-aging benefits.
`;

export const mockChat: DBMessage[] = [
  {
    id: '20a979d3-14e1-4d69-8ff7-34b19194c60f',
    createdAt: new Date(),
    chatId: '9423f3ee-2dc0-4a66-83e4-8f0085a9aa49',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'What are the benefits of hyaluronic acid in skincare products?',
      },
    ],
    attachments: [],
  },
  {
    id: '7b85fd3a-f852-462b-893a-f0b1d1c06f89',
    createdAt: new Date(),
    chatId: '9423f3ee-2dc0-4a66-83e4-8f0085a9aa49',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: mockContent,
      },
    ],
    attachments: [],
  },
];
