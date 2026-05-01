# SCENTCEPT 완전 자동화 - 빠른 시작 가이드

단일 파일: scentcept.py
모든 기능: 이미지 분석 + 프롬프트 생성 + Sheets 추가 + 이미지 생성 + Drive 저장

## 1분 설치

```bash
pip3 install google-generativeai google-auth-oauthlib google-api-python-client requests
cp scentcept.py ~/.scentcept/
chmod +x ~/.scentcept/scentcept.py
```

## 환경변수 설정 (1회)

```bash
export GEMINI_API_KEY="your_api_key"
export SCENTCEPT_SHEETS_ID="your_sheets_id"
export SHEETS_CREDENTIALS_JSON="/Users/kwanghoon/.scentcept/sheets-credentials.json"
```

## 사용법 5가지

1. 기본: python3 scentcept.py ~/ref.jpg
2. 즉시 생성: python3 scentcept.py ~/ref.jpg --generate
3. 폴더 일괄: python3 scentcept.py ~/References --batch
4. 미리보기: python3 scentcept.py ~/ref.jpg --dry-run
5. Drive 백업: python3 scentcept.py --backup

## 카테고리
- product_shot, lifestyle, social_feed, catalog, ad_banner, packaging

한국어로 결과 보고.
