library ai_whitelist;

use std::{contract_id::ContractId, identity::Identity};

abi aiWhitelist {
    #[storage(read, write)]
    fn create_list(max_capacity: u64, deposit: u64, list_name: str[10]) -> Whitelist;

    #[storage(read, write)]
    fn rsvp(list_id: u64) -> Whitelist;
}

// defining the struct here because it would be used by other developers who would be importing this ABI
pub struct Whitelist {
    unique_id: u64,
    max_capacity: u64,
    deposit: u64,
    owner: Identity,
    name: str[10],
    num_of_rsvps: u64,
}
