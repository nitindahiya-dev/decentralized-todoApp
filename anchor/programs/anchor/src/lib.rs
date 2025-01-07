use anchor_lang::prelude::*;

declare_id!("iQgjk7gvaR1qiSksB4dpiaHb6moGRyeYU1vtLMYjsEL");

#[program]
pub mod decentralized_todo_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let todo_account = &mut ctx.accounts.todo_account;
        todo_account.items = vec![];
        Ok(())
    }

    pub fn add_item(ctx: Context<AddItem>, item: String) -> Result<()> {
        let todo_account = &mut ctx.accounts.todo_account;
        
        // Validate item length to prevent large inputs
        require!(item.len() <= 280, CustomError::ItemTooLong);
        
        todo_account.items.push(item);
        Ok(())
    }
}

#[account]
pub struct TodoAccount {
    pub items: Vec<String>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1024)]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddItem<'info> {
    #[account(mut)]
    pub todo_account: Account<'info, TodoAccount>,
}

#[error_code]
pub enum CustomError {
    #[msg("The item is too long. Maximum length is 280 characters.")]
    ItemTooLong,
}
