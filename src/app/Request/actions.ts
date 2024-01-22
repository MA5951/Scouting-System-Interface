'use server';

export async function sendHttpRequest() {
  const response = await fetch('https://MA5951.pythonanywhere.com/update_image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'edit',
      team_number: 5951,
      coordinates: [[10, 10], [2700, 100], [1500, 50]],
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, error: 'Failed to process the request' };
  }
}
