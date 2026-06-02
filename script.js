// MAPA
const map = L.map('map').setView([-14.2, -51.9], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// controle do gráfico
let grafico = null;

// base de dados simulada
const dados = {
  AC:{p:1.0,i:0.6}, AL:{p:1.0,i:0.7}, AP:{p:1.0,i:0.6}, AM:{p:1.1,i:0.8},
  BA:{p:1.0,i:0.8}, CE:{p:1.0,i:0.7}, DF:{p:1.2,i:0.6}, ES:{p:1.1,i:0.6},
  GO:{p:1.4,i:0.7}, MA:{p:1.2,i:0.8}, MT:{p:1.5,i:0.9}, MS:{p:1.4,i:0.8},
  MG:{p:1.2,i:0.5}, PA:{p:1.1,i:0.9}, PB:{p:1.0,i:0.6}, PR:{p:1.3,i:0.6},
  PE:{p:1.0,i:0.7}, PI:{p:1.1,i:0.8}, RJ:{p:1.0,i:0.5}, RN:{p:1.0,i:0.6},
  RS:{p:1.3,i:0.6}, RO:{p:1.2,i:0.8}, RR:{p:1.0,i:0.7}, SC:{p:1.3,i:0.6},
  SP:{p:1.3,i:0.6}, SE:{p:1.0,i:0.6}, TO:{p:1.3,i:0.8}
};

// soluções por atividade
const solucoesPorAtividade = {
  soja: ["Rotação de culturas", "Plantio direto"],
  milho: ["Irrigação eficiente", "Adubação controlada"],
  feijao: ["Manejo do solo"],
  trigo: ["Controle biológico"],
  arroz: ["Uso racional da água"],
  cafe: ["Agrofloresta"],
  cana: ["Colheita sustentável"],
  pecuaria_corte: ["Recuperação de pastagens"],
  pecuaria_leite: ["Nutrição eficiente"],
  avicultura: ["Gestão de resíduos"],
  suinocultura: ["Biodigestores"],
  silvicultura: ["Reflorestamento"],
  extrativismo: ["Manejo sustentável"]
};

function analisar() {
  const estado = document.getElementById("estado").value;
  const cidade = document.getElementById("cidade").value;
  const atividade = document.getElementById("atividade").value;
  const res = document.getElementById("resultado");

  if (!cidade) {
    res.innerHTML = "⚠️ Digite a cidade.";
    return;
  }

  const base = dados[estado];

  let impacto = base.i * (Math.random() + 0.5);
  let lucroBase = base.p * (Math.random() * 50000 + 20000);

  let solucoes = solucoesPorAtividade[atividade] || ["Manejo sustentável"];

  let html = "";
  let dadosGrafico = [impacto * 100];

  solucoes.forEach(sol => {
    let ganho = Math.random() * 0.3 + 0.1;

    let lucroFinal = lucroBase * (1 + ganho);
    let impactoFinal = impacto * (1 - ganho);

    dadosGrafico.push(impactoFinal * 100);

    html += `
      <p><strong>${sol}</strong></p>
      <p>✔ Aplicação melhora produtividade e reduz impactos.</p>
      <p><strong>Lucro:</strong> R$ ${lucroFinal.toFixed(2)}</p>
      <p><strong>Impacto:</strong> ${(impactoFinal*100).toFixed(0)}%</p>
      <hr>
    `;
  });

  // atualizar mapa
  map.setView([-10 + Math.random()*20, -50 + Math.random()*20], 5);

  res.innerHTML = `
    <h2>${cidade} - ${estado}</h2>
    <p><strong>Atividade:</strong> ${atividade}</p>
    <p><strong>Impacto atual:</strong> ${(impacto*100).toFixed(0)}%</p>
    <h3>Soluções:</h3>
    ${html}
  `;

  atualizarGrafico(dadosGrafico);
}

// função corrigida do gráfico
function atualizarGrafico(dados) {
  const ctx = document.getElementById("grafico").getContext("2d");

  // destrói gráfico anterior corretamente
  if (grafico !== null) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Atual', 'Solução 1', 'Solução 2', 'Solução 3'],
      datasets: [{
        label: 'Impacto (%)',
        data: dados
      }]
    },
    options: {
      responsive: true
    }
  });
}