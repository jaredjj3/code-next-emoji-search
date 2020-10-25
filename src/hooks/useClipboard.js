import { useEffect } from 'react';

export const useClipboard = () => {
  useEffect(() => {
    const clipboard = new Clipboard('.copy-to-clipboard');
    return () => {
      clipboard.destroy();
    };
  }, []);
};
