import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Empty line
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Heading 2 (##)
      if (line.startsWith('## ')) {
        const heading = line.replace('## ', '');
        elements.push(
          <h2 key={`heading-${i}`} className="text-2xl sm:text-3xl font-bold text-primary font-rubik mb-4">
            {heading}
          </h2>
        );
        i++;
        continue;
      }

      // Heading 3 (###)
      if (line.startsWith('### ')) {
        const heading = line.replace('### ', '');
        elements.push(
          <h3 key={`heading3-${i}`} className="text-lg sm:text-xl font-bold text-primary font-rubik mt-4 mb-2">
            {heading}
          </h3>
        );
        i++;
        continue;
      }

      // Info box / Catatan (> )
      if (line.startsWith('> ')) {
        const boxContent = line.replace('> ', '');
        elements.push(
          <div
            key={`info-${i}`}
            className="bg-yellow-50 border-l-4 border-primary p-4 sm:p-5 my-4 rounded-r-lg font-poppins"
          >
            <p className="text-sm sm:text-base text-lessongray-700 leading-relaxed">
              <strong className="text-lessongray-900">Catatan:</strong> {boxContent}
            </p>
          </div>
        );
        i++;
        continue;
      }

      // Code block (`)
      if (line.startsWith('`')) {
        const codeContent = line.replace(/`/g, '');
        elements.push(
          <div
            key={`code-${i}`}
            className="bg-lessongray-100 border border-lessongray-300 rounded-lg p-4 my-4 font-mono text-sm overflow-x-auto font-poppins"
          >
            <code className="text-lessongray-800">{codeContent}</code>
          </div>
        );
        i++;
        continue;
      }

      // Bold text with colon (untuk label seperti "Definition:", "Formula:", "Example:")
      if (line.includes('**') && line.includes(':')) {
        const boldPattern = /\*\*([^*]+)\*\*:/g;
        const parts = line.split(boldPattern);
        elements.push(
          <p key={`bold-${i}`} className="text-lessongray-700 font-poppins mb-3 mt-3">
            {parts.map((part, idx) => {
              if (idx % 2 === 1) {
                return (
                  <strong key={idx} className="font-bold text-lessongray-900">
                    {part}:
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
        i++;
        continue;
      }

      // Bold inline text
      const boldInline = /\*\*([^*]+)\*\*/g;
      if (boldInline.test(line)) {
        const parts = line.split(/\*\*([^*]+)\*\*/);
        elements.push(
          <p key={`inline-bold-${i}`} className="text-lessongray-700 font-poppins mb-2">
            {parts.map((part, idx) =>
              idx % 2 === 1 ? (
                <strong key={idx} className="font-bold text-lessongray-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
        i++;
        continue;
      }

      // Regular paragraph
      if (line.trim()) {
        elements.push(
          <p key={`para-${i}`} className="text-lessongray-700 font-poppins mb-3 leading-relaxed">
            {line}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  const renderedContent = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="prose prose-sm sm:prose md:prose-lg max-w-none">
      {renderedContent}
    </div>
  );
};

export default MarkdownRenderer;
