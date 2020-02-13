import { Wallet } from './wallet.model';

export interface User {
    id: number;
    fullname: string;
    wallets: Wallet[];
}