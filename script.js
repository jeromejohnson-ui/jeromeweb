const SUPABASE_URL = "https://goupceptsijattqsqxma.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXBjZXB0c2lqYXR0cXNxeG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTEwOTMsImV4cCI6MjA4NzU4NzA5M30.g816kRFiFBdeDmz65JRBO6R4dMghF6VffaYbEX0Kb8M";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form = document.getElementById("feedbackForm");
const response = document.getElementById("response");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
        response.style.color = "red";
        response.textContent = "Please fill all fields!";
        return;
    }

    response.style.color = "black";
    response.textContent = "Sending...";

    const { error } = await supabase
        .from("feedback")
        .insert([{ name, message }]);

    if (error) {
        response.style.color = "red";
        response.textContent = "Error sending feedback!";
        console.error(error);
    } else {
        response.style.color = "green";
        response.textContent = "Feedback sent successfully!";
        form.reset();
    }

});

