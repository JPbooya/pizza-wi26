// Validates form data on the server side before processing.
export function validateForm(data) {
  console.log("Server side validation happens here");
  console.log(data);

  // Store error msgs in a array
  const errors = [];

  // Validate first name
  if (data.fname.trim() == "") {
    errors.push("First name is required.");
    
  }

  console.log(errors);

  // Validates last name 
  if (data.lname.trim() == "") {
    errors.push("Last name is required");
  }

  // Validate method (pickup or delivery)
  const validMethods = ['pickup', 'delivery'];
  if (!validMethods.includes(data.method)) {
    errors.push("method must be pick or delivery");
  }

  // Pizza size
  const validSize = ['small', 'medium', 'large'];
  if (!validSize.includes(data.method)) {
    errors.push("Must choose a size.")
  }

  console.log(errors);
  return {
    isValid: errors.length === 0,
    errors
  };
}