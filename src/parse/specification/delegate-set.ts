import * as assert from "assert";
import { DelegateSet } from "xrpl";
import { removeUndefined } from "../../common";
import { parseEmittedDetails } from "../ledger/emit_details";
import { parseMemos } from "../ledger/memos";
import { parseSigners } from "../ledger/signers";
import { parseSignerRegularKey } from "../ledger/regular-key";
import { parseDelegate } from "../ledger/delegate";
import { parseSource } from "../ledger/source";
import { parsePermissions } from "../ledger/permissions";
import { FormattedDelegateSetSpecification } from "../../types/delegate";

function parseDelegateSet(tx: DelegateSet): FormattedDelegateSetSpecification {
  assert.ok(tx.TransactionType === "DelegateSet");

  return removeUndefined({
    signers: parseSigners(tx),
    signer: parseSignerRegularKey(tx),
    delegate: parseDelegate(tx),
    source: parseSource(tx),
    authorize: tx.Authorize,
    permissions: parsePermissions(tx.Permissions),
    emittedDetails: parseEmittedDetails(tx),
    memos: parseMemos(tx),
  });
}

export default parseDelegateSet;
