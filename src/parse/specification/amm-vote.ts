import * as assert from "assert";
import { AMMVote } from "xrpl"
import { removeUndefined } from "../../common";
import parseAsset from "../ledger/asset";
import { parseMemos } from "../ledger/memos";
import { parseSigners } from "../ledger/signers";
import { parseSignerRegularKey } from "../ledger/regular-key";
import { parseDelegate } from "../ledger/delegate";
import { parseSource } from "../ledger/source";
import { FormattedAmmVoteSpecification } from "../../types/amm";

function parseAmmVote(tx: AMMVote): FormattedAmmVoteSpecification {
  assert.ok(tx.TransactionType === "AMMVote");

  return removeUndefined({
    signers: parseSigners(tx),
    signer: parseSignerRegularKey(tx),
    delegate: parseDelegate(tx),
    source: parseSource(tx),
    asset: parseAsset(tx.Asset as any),
    asset2: parseAsset(tx.Asset2 as any),
    tradingFee: tx.TradingFee,
    memos: parseMemos(tx),
  });
}

export default parseAmmVote;
