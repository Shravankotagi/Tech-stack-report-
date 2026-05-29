// components/results/ShareButton.tsx

'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  shareId: string;
}

export default function ShareButton({
  shareId,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/audit/${shareId}`;

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);
      toast.success('Link copied!');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-md bg-el-blue px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}

      {copied ? 'Copied' : 'Share Report'}
    </button>
  );
}