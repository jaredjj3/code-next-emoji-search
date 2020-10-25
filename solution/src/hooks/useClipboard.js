import { useEffect } from 'react';
import Clipboard from 'clipboard';

export const useClipboard = (querySelector) => {
  useEffect(() => {
    const clipboard = new Clipboard(querySelector);
    return () => {
      clipboard.destroy();
    };
  }, []);
};
