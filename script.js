const supabaseUrl = 'https://vudosidgtarntcrdkwez.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZG9zaWRndGFybnRjcmRrd2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxODUzODMsImV4cCI6MjA0OTc2MTM4M30.WEfJ9I32AMbv_LTVYo7dDQEZC1Ha1ggueFt5Vxo4sQ4';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const updateZipcodeButton = document.getElementById("update-zipcode-button");

const userInfoSection = document.getElementById("user-info");
const usernameDisplay = document.getElementById("username-display");
const zipcodeDisplay = document.getElementById("zipcode-display");
const updateZipcodeInput = document.getElementById("update-zipcode");

// Signup Functionality
signupButton.addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const zipcode = document.getElementById("signup-zipcode").value;

    if (email && username && password && zipcode) {
        const { data, error } = await supabaseClient.from('users').insert([
            { email, username, password, zipcode }
        ]);

        if (error) {
            alert(`Error signing up: ${error.message}`);
        } else {
            alert('Sign-up successful!');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Functionality
loginButton.addEventListener("click", async () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        const { data, error } = await supabaseClient
            .from('users')
            .select('username, zipcode')
            .eq('username', username)
            .eq('password', password);

        if (error) {
            alert(`Error logging in: ${error.message}`);
        } else if (data.length === 0) {
            alert('Invalid username or password.');
        } else {
            // Display user info
            usernameDisplay.textContent = data[0].username;
            zipcodeDisplay.textContent = data[0].zipcode;

            userInfoSection.style.display = 'block';
            
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Update Zipcode Functionality
updateZipcodeButton.addEventListener("click", async () => {
    const newZipcode = updateZipcodeInput.value;
    const username = usernameDisplay.textContent;

    if (newZipcode) {
        const { data, error } = await supabaseClient
            .from('users')
            .update({ zipcode: newZipcode })
            .eq('username', username);

        if (error) {
            alert(`Error updating zipcode: ${error.message}`);
        } else {
            alert('Zipcode updated successfully!');
            zipcodeDisplay.textContent = newZipcode;
            updateZipcodeInput.value = '';
        }
    } else {
        alert('Please enter a new zipcode.');
    }
});
