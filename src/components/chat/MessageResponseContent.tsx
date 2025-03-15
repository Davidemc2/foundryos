
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";

interface MessageResponseContentProps {
  content: string;
}

export const MessageResponseContent: React.FC<MessageResponseContentProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none prose-invert">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a className="text-violet-400 hover:text-violet-300 underline" {...props} target="_blank" rel="noopener noreferrer" />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc ml-4 my-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal ml-4 my-2" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-md font-bold my-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-2" {...props} />,
          code: ({ node, className, children, ...props }: Components["code"]) => {
            const match = /language-(\w+)/.exec(className || "");
            return !className?.includes("language-") ? (
              <code className="bg-gray-700 px-1 py-0.5 rounded text-xs" {...props}>
                {children}
              </code>
            ) : (
              <code className="block bg-gray-700 p-2 rounded-md text-xs my-2 overflow-x-auto" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => <pre className="bg-gray-700 p-2 rounded-md my-2 overflow-x-auto" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-violet-400 pl-2 italic my-2" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
