

const supabaseUrl = 'https://vudosidgtarntcrdkwez.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZG9zaWRndGFybnRjcmRrd2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxODUzODMsImV4cCI6MjA0OTc2MTM4M30.WEfJ9I32AMbv_LTVYo7dDQEZC1Ha1ggueFt5Vxo4sQ4';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

console.log('Supabase initialized:', supabase);

const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const responseDiv = document.getElementById("response");

signupButton.addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (email && username && password) {
        const { data, error } = await supabase.from('users').insert([
            { email: email, username: username, password: password }
        ]);

        if (error) {
            responseDiv.innerHTML = `<p>Error signing up: ${error.message}</p>`;
        } else {
            responseDiv.innerHTML = `<p>Sign-up successful for ${username} with email ${email}.</p>`;
        }
    } else {
        responseDiv.innerHTML = `<p>Please fill in all fields for sign-up.</p>`;
    }
});

loginButton.addEventListener("click", async () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        const { data, error } = await supabase
            .from('users')
            .select("*")
            .eq("username", username)
            .eq("password", password);

        if (error) {
            responseDiv.innerHTML = `<p>Error logging in: ${error.message}</p>`;
        } else if (data.length === 0) {
            responseDiv.innerHTML = `<p>Invalid username or password.</p>`;
        } else {
            responseDiv.innerHTML = `<p>Hi ${data[0].username}, you are successfully logged in!</p>`;
        }
    } else {
        responseDiv.innerHTML = `<p>Please fill in all fields for login.</p>`;
    }
});
