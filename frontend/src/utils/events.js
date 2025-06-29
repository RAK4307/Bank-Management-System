export const BALANCE_UPDATED_EVENT = 'balanceUpdated';

export const dispatchBalanceUpdated = (newBalanceValue) => {
  // Dispatch a custom event on the window object
  window.dispatchEvent(new CustomEvent(BALANCE_UPDATED_EVENT, {
    detail: { newBalance: newBalanceValue } // Pass the new balance as detail - IMPORTANT
  }));
};