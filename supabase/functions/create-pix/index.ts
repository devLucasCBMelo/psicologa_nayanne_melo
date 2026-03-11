import "@supabase/functions-js/edge-runtime.d.ts"

// 1. Cabeçalhos CORS: Essencial para o seu site React conseguir falar com a função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // 2. Lida com a requisição de "pré-voo" (preflight) do navegador
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 3. Recebe os dados do seu agendamento (nome, email e valor da consulta)
    const { nome, email, valor, dataConsulta, horaConsulta, token, installments, payment_method_id, issuer_id } = await req.json()
    
    // 4. Pega o Token que você salvou nos 'secrets' do Supabase
    const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')
    const isCard = !!token;

    if (!accessToken) {
      throw new Error('MERCADO_PAGO_ACCESS_TOKEN não encontrado nas variáveis de ambiente.')
    }

    // 5. Chamada oficial para o Mercado Pago (API de Pagamentos)
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Idempotency-Key": crypto.randomUUID()
      },
      body: JSON.stringify({
        transaction_amount: valor,
        description: `Consulta Psicologia: ${dataConsulta} às ${horaConsulta} - Paciente: ${nome}`,
        
        // Se for cartão, usamos os dados do Brick. Se não, usamos "pix"
        payment_method_id: isCard ? payment_method_id : "pix",
        
        // Campos específicos para cartão (são ignorados se for PIX)
        ...(isCard && {
          token,
          installments: Number(installments),
          issuer_id: Number(issuer_id),
        }),
    
        payer: {
          email: email,
          first_name: nome.split(' ')[0],
        },
      }),
    });

    const result = await response.json()

    if (!response.ok) {
      console.error('Erro no Mercado Pago:', result)
      throw new Error(result.message || 'Erro ao gerar pagamento')
    }

    // 6. Extrai os dados do PIX
    const pixData = result.point_of_interaction.transaction_data

    // 7. Retorna para o seu React o QR Code e o código Copia e Cola
    return new Response(
      JSON.stringify({
        qr_code_64: pixData.qr_code_base64,
        qr_code_copy: pixData.qr_code,
        payment_id: result.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    )
  }
})