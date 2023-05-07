contract;

dep ai_whitelist;
use ai_whitelist::*;

use std::{
    chain::auth::{
        AuthError,
        msg_sender,
    },
    constants::BASE_ASSET_ID,
    context::{
        call_frames::msg_asset_id,
        msg_amount,
        this_balance,
    },
    contract_id::ContractId,
    identity::Identity,
    logging::log,
    result::Result,
    storage::StorageMap,
    token::transfer,
};

storage {
    whitelists: StorageMap<u64, Whitelist> = StorageMap {},
    whitelist_id_counter: u64 = 0,
}
