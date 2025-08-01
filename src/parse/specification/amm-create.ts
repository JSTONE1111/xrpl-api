import * as assert from "assert";
import { AMMCreate } from "xrpl";
import { removeUndefined } from "../../common";
import parseAmount from "../ledger/amount";
import { parseMemos } from "../ledger/memos";
import { parseSigners } from "../ledger/signers";
import { parseSignerRegularKey } from "../ledger/regular-key";
import { parseDelegate } from "../ledger/delegate";
import { parseSource } from "../ledger/source";
import { FormattedAmmCreateSpecification } from "../../types/amm";

function parseAmmCreate(tx: AMMCreate): FormattedAmmCreateSpecification {
  assert.ok(tx.TransactionType === "AMMCreate");

  return removeUndefined({
    signers: parseSigners(tx),
    signer: parseSignerRegularKey(tx),
    delegate: parseDelegate(tx),
    source: parseSource(tx),
    amount: parseAmount(tx.Amount),
    amount2: parseAmount(tx.Amount2),
    tradingFee: tx.TradingFee,
    memos: parseMemos(tx),
  });
}

export default parseAmmCreate;
