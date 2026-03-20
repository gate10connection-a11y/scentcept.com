# SCENTCEPT — Fashion E-Commerce

미니멀 럭셔리 패션 이커머스 웹사이트입니다.

## 기술 스택

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Stripe** (결제 연동)
- **Mock Data** (DB 없이 정적 상품 데이터)

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 히어로 이미지, 신상품, 카테고리 그리드 |
| 컬렉션 | `/collections` | 상품 그리드, 카테고리 필터 |
| 상품 상세 | `/product/[id]` | 이미지, 설명, 사이즈 선택, 장바구니 추가 |
| 장바구니 | `/cart` | 상품 목록, 수량 변경, 삭제, 주문 요약 |
| 결제 | `/checkout` | 배송지 입력, Stripe Checkout 연동 |
| 주문 완료 | `/order-confirmation` | 감사 페이지 |

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일에 Stripe API 키를 입력합니다:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

> **Stripe 키 발급:** https://dashboard.stripe.com/apikeys  
> 테스트 키는 `sk_test_...` / `pk_test_...` 형식입니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## Stripe 테스트 결제

Stripe 키를 설정한 후, 테스트 카드 번호로 결제를 테스트할 수 있습니다:

| 카드 번호 | 만료일 | CVC |
|-----------|--------|-----|
| `4242 4242 4242 4242` | 임의 미래 날짜 | 임의 3자리 |

## 데모 모드

Stripe 키 없이도 실행됩니다. 결제 버튼 클릭 시 `/order-confirmation?demo=true`로 리다이렉트됩니다.

## 프로젝트 구조

```
scentcept/
├── app/
│   ├── page.tsx              # 홈
│   ├── layout.tsx            # 루트 레이아웃
│   ├── globals.css           # 전역 스타일
│   ├── collections/
│   │   └── page.tsx          # 컬렉션
│   ├── product/[id]/
│   │   └── page.tsx          # 상품 상세
│   ├── cart/
│   │   └── page.tsx          # 장바구니
│   ├── checkout/
│   │   └── page.tsx          # 결제
│   ├── order-confirmation/
│   │   └── page.tsx          # 주문 완료
│   └── api/checkout/
│       └── route.ts          # Stripe API
├── components/
│   ├── Navbar.tsx            # 네비게이션
│   ├── Footer.tsx            # 푸터
│   └── ProductCard.tsx       # 상품 카드
├── context/
│   └── CartContext.tsx       # 장바구니 상태 관리
├── lib/
│   ├── products.ts           # Mock 상품 데이터
│   └── types.ts              # TypeScript 타입
└── .env.local                # 환경변수 (Stripe 키)
```

## 디자인 컨셉

- **배경:** 순백 (#ffffff)
- **텍스트:** 순흑 (#000000)
- **타이포그래피:** Helvetica Neue / 트래킹 넓은 대문자 레이블
- **이미지:** 3:4 비율 제품 샷
- **레이아웃:** 미니멀, 많은 여백, 군더더기 없는 UI
