# HGCC 온라인 판매 스타터

## 1) 선행: Apps Script WebApp 준비
- 스크립트 속성에 다음 저장:
  - `SHEETS_WEBAPP_TOKEN` = 사이트와 공유할 토큰
  - `SHEET_ID` = (분리형이면) 도서 스프레드시트 ID
- `doPost`가 동작하도록 **웹 앱으로 배포**: 누구나 액세스(익명) 허용.
- 배포 URL을 `.env`의 `SHEETS_WEBAPP_URL`로 넣기.

## 2) 환경변수(.env.local)
- `.env.example`를 복사해 `.env.local`로 만들고 값 채우기
- Vercel 배포 시 같은 키들을 Project Settings → Environment Variables에 등록

## 3) 개발/실행
```bash
npm i
npm run dev
```

## 4) CSV 공개
- 재고/가격 출처는 **Google Sheets → 링크로 공개 → CSV 링크** 사용
- `.env.local`의 `NEXT_PUBLIC_INVENTORY_CSV_URL`에 붙여넣기

## 5) 결제 흐름 요약
- /checkout: Toss 위젯이 `orderId`, `amount`(장바구니 합계)로 결제 시도
- 성공 리다이렉트(/checkout/success)에서 `paymentKey, orderId, amount`를 받아
  - `POST /api/payments/confirm` (서버에서 Toss 검증)
  - 검증 OK면 `POST /api/orders/record` → Apps Script WebApp(`recordSale`) 호출
  - 도서목록 시트 재고수량 감소 및 판매내역 기록
