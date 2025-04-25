import { NextRequest, NextResponse } from 'next/server';

// 백엔드 서버 URL - Docker 환경에 맞게 수정
// Docker Compose 환경에서는 백엔드 서비스 이름을 사용하여 접근
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'http://backend:8000'  // Docker 내부 통신
  : 'http://localhost:8000'; // 로컬 개발 환경

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get('path') || '';
    const searchParams = new URLSearchParams();
    
    // 백엔드로 전달할 쿼리 파라미터 복사 (path 제외)
    url.searchParams.forEach((value, key) => {
      if (key !== 'path') {
        searchParams.append(key, value);
      }
    });
    
    // 백엔드 API URL 구성
    let apiUrl = `${BACKEND_URL}${path}`;
    if (searchParams.toString()) {
      apiUrl += `?${searchParams.toString()}`;
    }
    
    console.log(`Proxying request to: ${apiUrl}`);
    
    try {
      // 백엔드로 요청 전달
      const response = await fetch(apiUrl, {
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
    } catch (fetchError) {
      console.error(`Fetch error for ${apiUrl}:`, fetchError);
      
      // 클라이언트에게 더 명확한 오류 정보 제공
      return NextResponse.json(
        { 
          error: 'Failed to connect to backend server', 
          details: fetchError instanceof Error ? fetchError.message : String(fetchError),
          url: apiUrl,
          env: process.env.NODE_ENV || 'unknown'
        }, 
        { status: 502 }  // Bad Gateway - 더 적절한 상태 코드
      );
    }
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 