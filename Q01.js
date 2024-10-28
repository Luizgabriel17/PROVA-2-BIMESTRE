document.getElementById('consultar').onclick = function() {
    const ano = document.getElementById('ano').value;
    if (!ano) return alert('Por favor, insira um ano.');

    fetch(`https://api.nobelprize.org/v1/prize.json?year=${ano}`)
        .then(res => res.json())
        .then(dados => {
            const premios = dados.prizes;
            const resultado = document.getElementById('resultado');

            if (!premios || !premios.length) {
                resultado.innerHTML = `<p>Não foram encontrados prêmios para o ano de ${ano}.</p>`;
                return;
            }

            resultado.innerHTML = `<h2>Prêmios Nobel de ${ano}</h2>` + premios.map(premio => {
                const categoria = premio.category.charAt(0).toUpperCase() + premio.category.slice(1);
                const laureados = premio.laureates 
                    ? premio.laureates.map(l => `${l.firstname} ${l.surname}`).join(', ') 
                    : 'Laureado(s) não disponível';
                const motivacao = premio.laureates && premio.laureates[0].motivation 
                    ? premio.laureates[0].motivation 
                    : 'Motivação não disponível';

                return `
                    <h3>Categoria: ${categoria}</h3>
                    <p><strong>Laureado(s):</strong> ${laureados}</p>
                    <p><strong>Motivação:</strong> ${motivacao}</p>
                `;
            }).join('');
        })
        .catch(() => {
            document.getElementById('resultado').innerHTML = '<p>Erro ao buscar os dados. Tente novamente mais tarde.</p>';
        });
};
