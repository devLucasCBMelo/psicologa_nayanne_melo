import "@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { nome, email, valor, dataConsulta, horaConsulta, token, installments, payment_method_id, issuer_id } = body
    
    // ATENÇÃO: Verifique se o nome aqui é o mesmo que você deu no 'supabase secrets set'
    const accessToken = Deno.env.get('MP_ACCESS_TOKEN') || Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')
    const isCard = !!token;

    if (!accessToken) {
      throw new Error('Access Token não configurado no Supabase.')
    }

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Idempotency-Key": crypto.randomUUID()
      },
      body: JSON.stringify({
        transaction_amount: Number(valor),
        description: `Consulta Psicologia: ${dataConsulta} às ${horaConsulta}`,
        payment_method_id: isCard ? payment_method_id : "pix",
        ...(isCard && {
          token,
          installments: Number(installments),
          issuer_id: issuer_id ? Number(issuer_id) : undefined,
        }),
        payer: {
          email: email,
          first_name: nome.split(' ')[0],
        },
      }),
    });

    const result = await mpResponse.json()

    if (!mpResponse.ok) {
      console.error('Erro detalhado MP:', result);
      // Retorna o erro específico do Mercado Pago para ajudar no debug
      return new Response(JSON.stringify({ error: result.message, details: result.cause }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // LÓGICA HÍBRIDA DE RETORNO
    let responseData;

    if (payment_method_id === 'pix' || result.payment_method_id === 'pix') {
      // Se for PIX, envia os dados do QR Code
      const pixData = result.point_of_interaction.transaction_data;
      responseData = {
        type: 'pix',
        qr_code_64: pixData.qr_code_base64,
        qr_code_copy: pixData.qr_code,
        payment_id: result.id
      };
    } else {
      // Se for CARTÃO, envia o status e o ID do pagamento
      responseData = {
        type: 'card',
        status: result.status,
        status_detail: result.status_detail,
        payment_id: result.id
      };
    }

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Erro na função:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
})