import os
import json
from serpapi import GoogleSearch
# https://serpapi.com/integrations/python

params = {
  "q": "치와와 특징", # 찾고 싶은 키워드
  # "location": "Austin, Texas, United States", 장소도 설정 가능
  "hl": "ko", # 결과를 한국어로
  "gl": "kr", # 한국 결과
  "google_domain": "google.com", # 찾고 싶은 사이트
  "api_key": "806699250c3f33dc90770cb0cb6919fd7566d46e4582fa2fc10bc0b3687c8597" # 개인 api key; serp api 가입 후 부여됨
}

search = GoogleSearch(params)
results = search.get_dict()

# formatting
formatted_output = ""
for section, content in results.items():
    formatted_output += f"=== {section} ===\n"
    formatted_output += json.dumps(content, indent=2, ensure_ascii=False)
    formatted_output += "\n\n"

# txt file로 저장
file_path = os.path.join("backend/backend", "serpapi_results.txt")
with open(file_path, "w", encoding="utf-8") as f:
    f.write(formatted_output)
    print("successfully saved")

print(formatted_output)