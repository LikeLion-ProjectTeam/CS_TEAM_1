import React from 'react';

const supports = [
    {
      title: '$1000 지원!!',
      desc: '기회는...',
      date: '17 Jan 2022',
      location: 'Alabama',
      tags: ['Dev', 'Learning'],
    },
    {
      title: '이건 신청하면 도움이 옵니다!',
      desc: '이런한 점을 통해...',
      date: '19 Jan 2022',
      location: 'Milwaukee',
      tags: ['Jobs', 'Autism', 'Learning'],
    },
    {
      title: '우리 주위에 언제밴을 도움!',
      desc: '이런한 점을 통해...',
      date: '15 Jan 2022',
      location: 'North Carolina',
      tags: ['Dev', 'Autism'],
    },
    {
      title: 'How 일지 makes us better understand the world',
      desc: '이해하기 쉽게...',
      date: '11 Jan 2022',
      location: 'Madison',
      tags: ['Dev', 'Jobs'],
    },
    {
      title: '지원금 $2000 지원',
      desc: '다양한 지원...',
      date: '13 Jan 2022',
      location: 'Greenbay',
      tags: ['Communication', 'Learning', 'Self'],
    },
    {
      title: '지원자지원제',
      desc: '여러분의...',
      date: '13 Jan 2022',
      location: 'Waukesha',
      tags: ['Dev'],
    },
  ];
  

const Supports = () => {
  return (
    <section className="px-16 py-10">
      <h2 className="font-bold text-xl mb-6">SUPPORTS</h2>
      <div className="grid grid-cols-3 gap-6">
      {supports.map((support, index) => (
       <div key={index} className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-300">
            <p className="text-sm text-gray-400 mb-2">{support.location} • {support.date}</p>
            <h4 className="text-lg font-semibold">{support.title}</h4>
            <p className="text-gray-600 text-sm">{support.desc}</p>
            {/* Tags */}
            <div className="flex gap-2 mt-2 flex-wrap">
            {support.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full border">
                {tag}
              </span>
              
            ))}
            </div>
        </div>
        ))}

      </div>
      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="border px-3 py-1 rounded hover:bg-gray-100 transition">1</button>
        <button className="border px-3 py-1 rounded hover:bg-gray-100 transition">2</button>
        <button className="border px-3 py-1 rounded hover:bg-gray-100 transition">3</button>
        <span>...</span>
        <button className="border px-3 py-1 rounded hover:bg-gray-100 transition">Next</button>
      </div>
    </section>
  );
};

export default Supports;
