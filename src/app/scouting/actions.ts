'use server';

export async function editHttpRequest(data: any) {
    const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

  
    if (response.ok) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to process the request' };
    }
}

export async function resetHttpRequest(data: any) {
    const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  
    if (response.ok) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to process the request' };
    }
}
