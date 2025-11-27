async function register() {
    try {
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: '9876543210',
                email: 'owner@cafe.com',
                password: 'password123',
                name: 'Cafe Owner'
            })
        });
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Response:', text);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

register();
