// client.js

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(document.getElementById('reservationForm'));

    // Send form data to server
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
      // Display success message
      alert(data.message);
      // Redirect to thank you page
      window.location.href = 'thanks.html';
    })
    .catch(error => console.error('Error:', error));
  }

  // Add a 'submit' event listener to the form
  document.getElementById('submitBtn').addEventListener('click', function() {
    document.getElementById('reservationForm').submit();
  });