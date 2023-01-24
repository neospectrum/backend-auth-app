import url from 'url';
import path from 'path';

export const getDirName = () => {
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return __dirname;
};
