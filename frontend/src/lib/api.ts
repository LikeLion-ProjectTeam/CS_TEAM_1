const BASE_URL = "http://localhost:8000"; // backend link

export async function fetchEvents() {
  // try {
  //   const res = await fetch(`${BASE_URL}/api/events/`, {
  //     headers: {
  //       // replace with real API key later:
  //       "Authorization": "Bearer YOUR_API_KEY_HERE", 
  //     },
  //   });
  //   return await res.json();
  // } catch (err) {
  //   console.warn("Using placeholder events due to fetch failure.");
  //   return [
  //     {
  //       title: "Placeholder Event",
  //       desc: "This is a test event from placeholder.",
  //       date: "2025-05-01",
  //       tags: ["test", "demo"],
  //     },
  //   ];
  // }
  return [
    {
      title: "Learning how to ---",
      desc: "Do you want to get your own ability to build --- 이벤트 정보...",
      date: "20 Jan 2024",
      tags: ["Deaf", "Autism", "Learning"],
      image: "/placeholder-event.jpg"
    },
    {
      title: "Bill speaking lessons",
      desc: "Hello! It's me! I don’t know what to write...",
      date: "19 Jan 2024",
      tags: ["Jobs", "Learning"],
      image: "/placeholder-event.jpg"
    },
  ];
}

export async function fetchSupports() {
  try {
    const res = await fetch(`${BASE_URL}/api/supports/`, {
      headers: {
        // placeholder for API key
        "Authorization": "Bearer YOUR_API_KEY_HERE",
      },
    });
    return await res.json();
  } catch (err) {
    console.warn("Using placeholder supports due to fetch failure.");
    return [
      {
        title: "Placeholder Support",
        desc: "This is a sample support item.",
        date: "2025-05-10",
        location: "Online",
        tags: ["help", "demo"],
      },
    ];
  }
  return [
    {
      title: "Learning how to ---",
      desc: "Do you want to get your own ability to build --- 이벤트 정보...",
      date: "20 Jan 2024",
      tags: ["Deaf", "Autism", "Learning"],
      image: "/placeholder-event.jpg"
    },
    {
      title: "Bill speaking lessons",
      desc: "Hello! It's me! I don’t know what to write...",
      date: "19 Jan 2024",
      tags: ["Jobs", "Learning"],
      image: "/placeholder-event.jpg"
    },
  ];
}
