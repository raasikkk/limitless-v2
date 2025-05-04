import DOMPurify from 'dompurify';

export const TextOnlyDescription = ({ html, className }: { html: string, className: string }) => {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br']
    });
  
    return <div 
    className={`truncate text-sm text-ellipsis ${className}`}
    dangerouslySetInnerHTML={{ __html: clean }}
    >
      {/* { html } */}
    </div>;
  };