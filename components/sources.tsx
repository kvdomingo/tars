import type { UIMessage } from 'ai';

interface SourcesProps {
  message: UIMessage;
}

export function Sources({ message }: SourcesProps) {
  const sources = message.parts.filter((p) => p.type === 'source');

  return (
    <div>
      <h4 className="font-bold text-lg">Sources</h4>
      {sources.length > 0 ? (
        <ol className="list-decimal">
          {sources.map((s) => (
            <li key={s.source.id}>
              {s.source.title}{' '}
              <a
                href={s.source.url}
                className="text-sidebar-ring"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.source.url}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        'No sources'
      )}
    </div>
  );
}
