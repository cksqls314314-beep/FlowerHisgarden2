export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sheetsUrl = process.env.SHEETS_WEBAPP_URL!;
    const token = process.env.SHEETS_WEBAPP_TOKEN!;

    if (!sheetsUrl || !token) {
      return new Response(JSON.stringify({ ok: false, message: 'Missing env: SHEETS_WEBAPP_URL / SHEETS_WEBAPP_TOKEN' }), { status: 500 });
    }

    const { orderId, amount, lineItems } = body || {};
    if (!orderId) {
      return new Response(JSON.stringify({ ok: false, message: 'orderId required' }), { status: 400 });
    }

    const webappRes = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        action: 'recordSale',
        payload: { orderId, amount, lineItems: lineItems || [] }
      })
    });

    const data = await webappRes.json();
    const status = (data && typeof data.code === 'number') ? data.code : webappRes.status;

    return new Response(JSON.stringify(data), { status });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, message: String(err) }), { status: 500 });
  }
}
