export async function GET() {
  return new Response(
    JSON.stringify([
      {
        type: 'product',
        id: 'd7e08baf-6b69-46ab-8052-ee1f4de8bf0d',
        content: {
          name: 'Niacinamide 10% + Zinc 1%',
          brand: 'The Ordinary',
          rating: 4.6,
          price_min: 55.0,
          price_max: 65.0,
          actions: {
            button_text: 'Explore Product',
            path: '/product-insights/niacinamide-10-zinc-1',
          },
        },
      },
      {
        type: 'product',
        id: '9e93f5ae-abce-4edb-a6b0-dd120817d78e',
        content: {
          name: 'C-Firma Fresh Day Serum',
          brand: 'Drunk Elephant',
          rating: 4.3,
          price_min: 72.0,
          price_max: 89.0,
          actions: {
            button_text: 'Explore Product',
            path: '/product-insights/c-firma-fresh-day-serum',
          },
        },
      },
      {
        type: 'product',
        id: 'a2bdeaa8-2152-4238-9433-fa21c0708ea1',
        content: {
          name: 'Hydrating Cleanser',
          brand: 'CeraVe',
          rating: 4.8,
          price_min: 12.99,
          price_max: 19.99,
          actions: {
            button_text: 'Explore Product',
            path: '/product-insights/hydrating-cleanser',
          },
        },
      },
    ]),
  );
}
