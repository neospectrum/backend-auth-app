export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: number;
            BOT_TOKEN: string;
            MONGO_URL: string;
            ORIGIN_URL: string;
            SERVER_URL: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}
