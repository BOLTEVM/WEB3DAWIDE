import { TheGuardsWalletPipeline, WalletTxRequest, WalletTxResult } from '../../../../../theguards';

export interface BoltIdeTxRequest extends WalletTxRequest {
    contractSource?: string;
    compilerVersion?: string;
}

/**
 * Bolt IDE Wallet Pipeline
 * Native Web3 transaction execution pipeline for bide IDE stack folder.
 * Handles smart contract deployments and IDE compilation transactions via The Guards Scaffolding (WG-01..04).
 */
export class BoltIdeWalletPipeline {
    /**
     * Executes a smart contract deployment or compilation transaction and AWAITS on-chain block receipt verification.
     */
    public static async executeAndAwaitTransaction(
        req: BoltIdeTxRequest
    ): Promise<WalletTxResult> {
        console.log(`[BoltIdeWalletPipeline] Executing smart contract deployment/transaction from Bolt IDE to ${req.to}...`);

        return TheGuardsWalletPipeline.executeAndAwaitTransaction({
            to: req.to,
            from: req.from,
            data: req.data,
            value: req.value,
            gasLimit: req.gasLimit,
            chainId: req.chainId,
            rpcUrl: req.rpcUrl,
            provider: req.provider,
            confirmations: req.confirmations,
            timeoutMs: req.timeoutMs
        });
    }

    public static async ensureChain(provider: any, chainId: number, rpcUrl: string) {
        return TheGuardsWalletPipeline.ensureChain(provider, chainId, rpcUrl);
    }
}
