class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects.
    let total = 0;
    this.transactions.forEach((x)=>total+=x.value);
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit(){
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {
 get value(){
  return this.amount;
 }
 isAllowed(){
  return this.amount >= 1;
}
}

class Withdrawal extends Transaction {

  get value(){ return  -this.amount};

  isAllowed(){
    return this.account.balance >= this.amount;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");



t2 = new Withdrawal(999, myAccount);
t2.commit();

t3 = new Deposit(120, myAccount);
t3.commit();
t1 = new Withdrawal(50.25, myAccount);
t1.commit();

console.log(myAccount.balance);
