# ─────────────────────────────────────────────────────────────
# 태그/카테고리 자동 분류 모듈
# 크롤링된 텍스트에서 사전 정의 키워드를 기반으로 태그와 카테고리 추출
# ─────────────────────────────────────────────────────────────

# 태그 리스트 (자동 태그 분류용)
PREDEFINED_KEYWORDS = [
    "blind", "deaf", "physical disability", "intellectual disability", "autism spectrum disorder",
    "welfare", "financial aid", "disability", "benefits", "SSI", "grants",
    "accessibility", "universal design", "assistive technology", "accessible design", "screen reader",
    "audiodescription", "braille", "ASL", "sign language", "hearing aids", "prosthesis", "mental health awareness",
    "inclusion", "disability rights", "emotional intelligence", "community support", "smart devices",
    "Alexa", "Google Assistant", "Siri", "voice control", "captioning", "deaf culture"
]

def extract_tags(text: str) -> list:
    # 주어진 텍스트(제목&미리보기)에서 PREDEFINED_KEYWORDS에 포함된 키워드를 찾아 태그 리스트로 반환
    text = text.lower()
    return [keyword for keyword in PREDEFINED_KEYWORDS if keyword in text]  

def classify_category(text: str) -> str:
    # 텍스트에 포함된 키워드를 기준으로 카테고리를 분류하여 반환 
    # -> 사용자가 프론트에서 job section 누르면 job 관련 정보만 가져오도록 (검색창과 관련없음)
    # job: 채용/모집
    # event: 행사/세미나
    # welfare: 복지/정책
    # other: 해당 없음

    text = text.lower()

    # 제목/미리보기에서 특정 키워드로 카테고리(job, event, policy) 추론
    if any(keyword in text for keyword in ["job", "hiring", "employment", "apply", "position", "opportunity"]):
        return "job"
    elif any(keyword in text for keyword in ["event", "conference", "workshop", "webinar", "campaign", "forum"]):
        return "event"
    elif any(keyword in text for keyword in ["benefit", "welfare", "empower", "financial aid", "grant", "ssi", "policy", "registration", "support"]):
        return "welfare"
    else:
        return "other"
