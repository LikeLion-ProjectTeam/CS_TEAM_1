import { NextRequest, NextResponse } from 'next/server';

// 백엔드 서버 URL - Docker 환경과 로컬 환경 모두 고려
const BACKEND_URL = 'http://localhost:8000/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // URL에서 경로 및 쿼리 파라미터 추출
    const { slug } = params;
    
    // 백엔드 API URL 구성 - 단일 태그 검색
    const url = `${BACKEND_URL}/search/${slug}/`;
    
    console.log(`Proxying tag request to: ${url}`);
    
    // 백엔드로 요청 전달
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    // 응답이 성공적이지 않은 경우 오류 반환
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Backend request failed: ${response.status}, Details: ${errorText}`);
      return NextResponse.json(
        { error: `Backend request failed with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }
    
    // 백엔드에서 받은 데이터
    const data = await response.json();
    
    // 클라이언트에 응답 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 