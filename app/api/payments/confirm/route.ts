export async function POST(req: Request) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return new Response(JSON.stringify({ ok: false, message: 'paymentKey/orderId/amount required' }), { status: 400 });
    }

    const secret = process.env.TOSS_SECRET_KEY!;
    if (!secret) {
      return new Response(JSON.stringify({ ok: false, message: 'Missing env: TOSS_SECRET_KEY' }), { status: 500 });
    }

    // Basic auth header: base64("<secret>:")
    const auth = Buffer.from(`${secret}:`).toString('base64');

    const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) })
    });

    const data = await tossRes.json();
    if (!tossRes.ok) {
      return new Response(JSON.stringify({ ok: false, message: data?.message || 'Toss confirm failed', data }), { status: tossRes.status });
    }

    return new Response(JSON.stringify({ ok: true, data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, message: String(err) }), { status: 500 });
  }
}
