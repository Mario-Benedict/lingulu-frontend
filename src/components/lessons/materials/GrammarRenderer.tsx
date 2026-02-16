import { useState, useEffect } from 'react';
import type { Grammar } from '@/types';
import { env } from '@/config/env';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface GrammarRendererProps {
  grammarItems: Array<Grammar>;
}

const GrammarRenderer: React.FC<GrammarRendererProps> = ({ grammarItems }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMarkdownFiles = async () => {
      if (!grammarItems || grammarItems.length === 0) {
        setError('No grammar content available');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all markdown files from all grammar items (from CDN)
        const fetchPromises = grammarItems.map(async (item) => {
          // Check if filePath is already a full URL (CDN link)
          const fileUrl = item.filePath.startsWith('http://') || item.filePath.startsWith('https://')
            ? item.filePath
            : `${env.API_BASE_URL}${item.filePath}`;

          const response = await fetch(fileUrl);

          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${item.filePath}`);
          }

          return await response.text();
        });

        // Wait for all fetches to complete
        const allContents = await Promise.all(fetchPromises);

        // Combine all markdown content with separator
        const combinedContent = allContents.join('\n\n---\n\n');
        setMarkdownContent(combinedContent);
      } catch (err) {
        console.error('Error fetching markdown files:', err);
        setError('Failed to load grammar content');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMarkdownFiles();
  }, [grammarItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lessongray-600 font-poppins">Loading grammar content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <p className="text-red-700 font-poppins">{error}</p>
      </div>
    );
  }

  if (!markdownContent) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <p className="text-yellow-700 font-poppins">No content available.</p>
      </div>
    );
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl sm:text-4xl font-bold text-primary font-rubik mb-4 mt-8" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-rubik mb-4 mt-6" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-primary font-rubik mb-3 mt-5" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-lg sm:text-xl font-semibold text-lessongray-800 font-rubik mb-2 mt-4" {...props} />
          ),
          h5: ({ ...props }) => (
            <h5 className="text-base sm:text-lg font-semibold text-lessongray-800 font-rubik mb-2 mt-3" {...props} />
          ),
          h6: ({ ...props }) => (
            <h6 className="text-sm sm:text-base font-semibold text-lessongray-700 font-rubik mb-2 mt-3" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-lessongray-700 font-poppins mb-4 leading-relaxed" {...props} />
          ),
          a: ({ ...props }) => (
            <a className="text-primary hover:text-primary-dark underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-lessongray-900" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-lessongray-800" {...props} />
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className="bg-lessongray-100 border border-lessongray-300 rounded-lg p-4 my-4 overflow-x-auto">
                <code className={`text-sm font-mono text-lessongray-800 ${className || ''}`} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-lessongray-100 text-lessongray-800 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => (
            <pre className="bg-lessongray-100 border border-lessongray-300 rounded-lg p-4 my-4 overflow-x-auto" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-primary bg-yellow-50 p-4 my-4 rounded-r-lg" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside ml-4 mb-4 space-y-2 text-lessongray-700 font-poppins" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside ml-4 mb-4 space-y-2 text-lessongray-700 font-poppins" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="text-lessongray-700 font-poppins leading-relaxed" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-8 border-t-2 border-lessongray-300" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-lessongray-300" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-lessongray-100" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="border-b border-lessongray-200" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="border border-lessongray-300 px-4 py-2 text-left font-semibold text-lessongray-800 font-rubik" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="border border-lessongray-300 px-4 py-2 text-lessongray-700 font-poppins" {...props} />
          ),
          img: ({ ...props }) => (
            <img className="max-w-full h-auto rounded-lg my-4" {...props} />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default GrammarRenderer;
