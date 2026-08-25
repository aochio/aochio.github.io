import { useEffect, useRef } from 'react';

type Props = {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
};

/**
 * A Google AdSense ad slot.
 *
 * To start earning:
 * 1. Create a Google AdSense account and get it approved.
 * 2. Add your publisher ID (ca-pub-XXXXXXXXXXXXXXXX) to the <ins> data-ad-client
 *    below, or set VITE_ADSENSE_CLIENT in .env and read import.meta.env.
 * 3. Create ad units in AdSense and paste their slot IDs into the `slotId` prop
 *    where each <AdSlot /> is used.
 *
 * Until then the slot renders a subtle placeholder so the layout is stable.
 */
export function AdSlot({ slotId, format = 'auto', className = '' }: Props) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only attempt to push an ad if the AdSense script is present and a client
    // id is configured. Otherwise the placeholder stays.
    const client = (window as any).adsbygoogle;
    if (client && slotId) {
      try {
        client.push({});
      } catch {
        /* no-op */
      }
    }
  }, [slotId]);

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 ${className}`}
    >
      <ins
        ref={ref}
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId ?? ''}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {!slotId && (
        <p className="px-4 py-6 text-center text-xs text-slate-400">
          Ad space — connect Google AdSense to show ads here
        </p>
      )}
    </div>
  );
}
