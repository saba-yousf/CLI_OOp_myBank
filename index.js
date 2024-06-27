import inquirer from "inquirer";
//Bank Account  class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber; // this class k object ko represent karta hai.
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount; // this ager constructor se bahr ho to ye class k object ko refer karta hai .
            console.log(`withdrawl of $${amount} successful. Remaining balance is $${this.balance}`);
        }
        else {
            console.log("insufficient balance.");
        }
    }
    // Credit money 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // 1$ fee charged if more than 100$ is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful . remaining balnce $${this.balance}`);
    }
    // Check Balance 
    checkBalance() {
        console.log(`Current balance $${this.balance}`);
    }
}
// Customers Class 
class Customer {
    firstName;
    lastName;
    gender;
    age;
    phoneNumber;
    account;
    constructor(firstName, lastName, gender, age, phoneNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.account = account;
    }
}
// create Bank Accounts
const accounts = [
    new BankAccount(1201, 500),
    new BankAccount(1202, 1000),
    new BankAccount(1203, 2000)
];
// Create Customers 
const Customers = [
    new Customer("saba", "yosuf", "female", 21, 3136224242, accounts[0]),
    new Customer("uzma", "khan", "female", 18, 3124545321, accounts[1]),
    new Customer("Asad", "khan", "male", 20, 3457667832, accounts[2])
];
// Function to interact with bank account 
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: ",
        });
        const Customer = Customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an Operation ",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit: "
                    });
                    Customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit: "
                    });
                    Customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting  bank program...");
                    console.log("\n Thank you for using our bank services. \n Have a great day!");
                    return; // ye exit ko function se bahr kardy ga          
            }
        }
        else {
            console.log("Invalid account number. please try again.");
        }
    } while (true);
}
service();
