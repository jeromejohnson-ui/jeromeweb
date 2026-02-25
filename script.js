const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY";

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