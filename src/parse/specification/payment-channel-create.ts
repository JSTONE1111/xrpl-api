import * as assert from "assert";
import { PaymentChannelCreate } from "xrpl";
import { removeUndefined } from "../../common";
import { parseTimestamp } from "../utils";
import parseAmount from "../ledger/amount";
import { parseEmittedDetails } from "../ledger/emit_details";
import { parseMemos } from "../ledger/memos";
import { parseSigners } from "../ledger/signers";
import { parseSignerRegularKey } from "../ledger/regular-key";
import { parseDelegate } from "../ledger/delegate";
import { parseSource } from "../ledger/source";
import { parseDestination } from "../ledger/destination";
import { FormattedPaymentChannelCreateSpecification } from "../../types/payment_channels";

function parsePaymentChannelCreate(tx: PaymentChannelCreate): FormattedPaymentChannelCreateSpecification {
  assert.ok(tx.TransactionType === "PaymentChannelCreate");

  return removeUndefined({
    signers: parseSigners(tx),
    signer: parseSignerRegularKey(tx),
    delegate: parseDelegate(tx),
    source: parseSource(tx),
    destination: parseDestination(tx),
    amount: parseAmount(tx.Amount),
    settleDelay: tx.SettleDelay,
    publicKey: tx.PublicKey,
    cancelAfter: tx.CancelAfter && parseTimestamp(tx.CancelAfter),
    emittedDetails: parseEmittedDetails(tx),
    memos: parseMemos(tx),
  });
}

export default parsePaymentChannelCreate;
