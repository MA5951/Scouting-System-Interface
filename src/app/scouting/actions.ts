'use server';

export async function sendHttpRequest(data: any) {
    const response = await fetch('https://MA5951.pythonanywhere.com/update_image', {
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

export async function resetHttpRequest(team_number: number) {
    const response = await fetch('https://MA5951.pythonanywhere.com/update_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "action": "reset",
            "team_number": team_number
        }),
    });
  
    if (response.ok) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to process the request' };
    }
}