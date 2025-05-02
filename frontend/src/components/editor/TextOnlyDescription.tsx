import DOMPurify from 'dompurify';

export const TextOnlyDescription = ({ html }: { html: string }) => {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br']
    });
  
    return <div 
      className="text-sm truncate"
      dangerouslySetInnerHTML={{ __html: clean }}
    />;
  };