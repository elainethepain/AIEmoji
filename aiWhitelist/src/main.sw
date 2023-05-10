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

Storage {
    whitelists: StorageMap<u64, Whitelist> = StorageMap {},
    whitelist_id_counter: u64 = 0,
}

impl ai_whitelist for Contract {
    #[storage(read, write)]
    fn create_whitelist(capacity: u64, price: u64, whitelist_name: str[10]) -> Whitelist {
        let campaign_id = storage.whitelist_id_counter;
        let new_whitelist = Whitelist {
            unique_id: campaign_id,
            max_capacity: capacity,
            deposit: price,
            owner: msg_sender().unwrap(),
            name: whitelist_name,
            num_of_rsvps: 0,
        };

        storage.whitelists.insert(campaign_id, new_whitelist);
        storage._id_counter += 1;
        let mut selectedWhitelist = storage.whitelists.get(storage.whitelist_id_counter - 1);
        return selectedWhitelist;
    }
}
#[storage(read, write)]
    fn rsvp(whitelist_id: u64) -> Whitelist {
        let sender = msg_sender().unwrap();
        let asset_id = msg_asset_id();
        let amount = msg_amount();

     // get the list
     //variables are immutable by default, so you need to use the mut keyword
        let mut selected_whitelist = storage.whitelists.get(whitelist_id);

    // check to see if the Listid is greater than storage.whitelist_id_counter, if
    // it is, revert
        require(selected_whitelist.unique_id < storage.whitelist_id_counter, InvalidRSVPError::InvalidEventID);

    // check to see if the asset_id and amounts are correct, etc, if they aren't revert
        require(asset_id == BASE_ASSET_ID, InvalidRSVPError::IncorrectAssetId);
        require(amount >= selected_whitelist.deposit, InvalidRSVPError::NotEnoughTokens);

          //send the payout from the msg_sender to the owner of the selected whitelist
        transfer(amount, asset_id, selected_whitelist.owner);

    // edit the whitelist
        selected_whitelist.num_of_rsvps += 1;
        storage.whitelists.insert(whitelist_id, selected_whitelist);

    // return the whitelist
        return selected_whitelist;
    }

