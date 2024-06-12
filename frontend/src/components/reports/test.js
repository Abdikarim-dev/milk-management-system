import { format } from 'date-fns';



// Example usage
try {
  const dateStr = 'Fri Jun 21 2024 00:00:00 GMT+0300 (East Africa Time)';
  const formattedDate = formatDate(dateStr);
  console.log(formattedDate);  // Output: 2024-06-21
} catch (error) {
  console.error(error.message);
}
