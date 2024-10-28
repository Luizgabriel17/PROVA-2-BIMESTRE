document.getElementById('consultar').onclick = function() {
    const ano = document.getElementById('ano').value;
    if (!ano) return alert('Digite um ano.');

    fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
        .then(res => res.json())
        .then(feriados => {
            const feriadosPorMes = {};
            feriados.forEach(f => {
                const mes = new Date(f.date).toLocaleString('pt-BR', { month: 'long' });
                const dia = new Date(f.date).getDate();
                feriadosPorMes[mes] = feriadosPorMes[mes] || [];
                feriadosPorMes[mes].push(dia + ' - ' + f.name);
            });

            const meses = [
                "janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];

            let resultado = '<h2>Total: ' + feriados.length + '</h2>';
            resultado += meses.map(m => 
                feriadosPorMes[m] ? `<h3>${m.charAt(0).toUpperCase() + m.slice(1)}</h3><p>${feriadosPorMes[m].join('<br>')}</p>` : ''
            ).join('');

            document.getElementById('resultado').innerHTML = resultado;
        })
        .catch(() => alert('Erro ao buscar os feriados.'));
};
