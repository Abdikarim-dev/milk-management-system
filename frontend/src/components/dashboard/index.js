// Initialize the array to store transactions
let transactions = [];

/**
 * Adds a new transaction to the array while ensuring it only keeps the latest five transactions.
 * @param {string} date - The date of the transaction in ISO format (e.g., '2024-05-15T13:28:04.825Z')
 * @param {any} data - The data associated with the transaction (could be any additional details)
 */
function addTransaction(date, data) {
    // Create a new transaction object
    const transaction = {
        date: new Date(date), // Convert string to Date object for better handling
        data: data
    };

    // Add new transaction to the start of the array
    transactions.unshift(transaction);

    // Check if the array has more than five transactions
    if (transactions.length > 5) {
        // Remove the oldest transaction
        transactions.pop();
    }
}

// Example usage
addTransaction('2024-05-15T13:28:04.825Z', { amount: 100, type: 'deposit' });
addTransaction('2024-05-16T14:30:00.000Z', { amount: 200, type: 'withdrawal' });
addTransaction('2024-05-17T15:35:20.123Z', { amount: 50, type: 'deposit' });
addTransaction('2024-05-18T16:40:30.456Z', { amount: 75, type: 'withdrawal' });
addTransaction('2024-05-19T17:45:40.789Z', { amount: 125, type: 'deposit' });
addTransaction('2024-05-20T18:50:50.000Z', { amount: 300, type: 'withdrawal' });

// Console log to see the state of transactions array
console.log(transactions);
