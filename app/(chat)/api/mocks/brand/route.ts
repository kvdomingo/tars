export async function GET() {
  return new Response(
    JSON.stringify([
      {
        type: 'brand',
        id: 'ad8bf73b-b8c2-4366-a496-fafc1c2d4f81',
        content: {
          name: 'The Ordinary',
          search_metrics: {
            volume: 4100,
            yoy_change: -21.9,
          },
          actions: [
            {
              button_text: 'Explore Brand',
              path: '/brand/the-ordinary',
            },
          ],
        },
      },
      {
        type: 'brand',
        id: 'a9e34c23-6a62-4bab-b28c-862a19ffd60b',
        content: {
          name: 'Drunk Elephant',
          search_metrics: {
            volume: 8100,
            yoy_change: -8.5,
          },
          actions: [
            {
              button_text: 'Explore Brand',
              path: '/brand/the-ordinary',
            },
          ],
        },
      },
      {
        type: 'brand',
        id: '8e07f246-4321-4add-bef9-dc5aeff21f4a',
        content: {
          name: 'CeraVe',
          search_metrics: {
            volume: 14500,
            yoy_change: -5.3,
          },
          actions: [
            {
              button_text: 'Explore Brand',
              path: '/brand/cerave',
            },
          ],
        },
      },
    ]),
  );
}
