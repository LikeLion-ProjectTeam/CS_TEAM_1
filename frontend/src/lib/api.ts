export async function fetchEvents() {
    const res = await fetch('http://localhost:8000/events');
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  }
  
  export async function fetchSupports() {
    const res = await fetch('http://localhost:8000/supports');
    if (!res.ok) throw new Error('Failed to fetch supports');
    return res.json();
  }
  