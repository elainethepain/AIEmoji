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

impl ai_whitelist for Contract {
    #[storage(read, write)]
    fn create_whitelist(capacity: u64, price: u64, whitelist_name: str[10]) -> Whitelist {
        let campaign_id = storage.whitelist_id_counter;
        let new_whitelist = Event {
            unique_id: campaign_id,
            max_capacity: capacity,
            deposit: price,
            owner: msg_sender().unwrap(),
            name: whitelist_name,
            num_of_rsvps: 0,
        };

        storage.events.insert(campaign_id, new_whitelist);
        storage._id_counter += 1;
        let mut selectedWhitelist = storage.whitelists.get(storage.whitelist_id_counter - 1);
        return selectedWhitelist;
    }
}
