export interface IngredientData {
  type: 'ingredient';
  id: string;
  content: {
    name: string;
    search_metrics: {
      volume: number;
      yoy_change: number;
    };
    description: string;
    actions: {
      button_text: string;
      path: string;
    }[];
  };
}

export async function GET() {
  return new Response(
    JSON.stringify([
      {
        type: 'ingredient',
        id: '2e4ca9e9-9740-4743-8df4-656aa233559c',
        content: {
          name: 'hyaluronic acid',
          search_metrics: {
            volume: 12700,
            yoy_change: 15.8,
          },
          description:
            'A powerful humectant that can hold up to 1000x its weight in water.',
          actions: [
            {
              button_text: 'Explore on Google Insights',
              path: '/google-insights/hyaluronic-acid',
            },
            {
              button_text: 'Explore on Ingredient Insights',
              path: '/ingredient/hyaluronic-acid',
            },
          ],
        },
      },
      {
        type: 'ingredient',
        id: 'a850dec3-fd01-48a0-aaa5-7f347e46bea3',
        content: {
          name: 'niacinamide',
          search_metrics: {
            volume: 7600,
            yoy_change: 42.1,
          },
          description:
            'A form of vitamin B3 that helps improve skin texture and reduce pore appearance.',
          actions: [
            {
              button_text: 'Explore on Google Insights',
              path: '/google-insights/niacinamide',
            },
            {
              button_text: 'Explore on Ingredient Insights',
              path: '/ingredient/niacinamide',
            },
          ],
        },
      },
    ]),
  );
}
