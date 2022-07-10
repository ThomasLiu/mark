import { Application, IBoot } from 'egg';
export default class FooBoot implements IBoot {
    private readonly app;
    constructor(app: Application);
    configWillLoad(): void;
    configDidLoad(): void;
    didLoad(): Promise<void>;
    willReady(): Promise<void>;
    didReady(): Promise<void>;
    serverDidReady(): Promise<void>;
    beforeClose(): Promise<void>;
}
