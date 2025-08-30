// Espera que todo o conteúdo do HTML seja carregado antes de executar o código.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML usando os IDs corretos.
    const emailTextInput = document.getElementById('email-text');
    const fileInput = document.getElementById('file-upload');
    const analyzeButton = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('result-area');
    const classificationSpan = document.getElementById('classification-result');
    const suggestionSpan = document.getElementById('suggestion-result');
    const fileNameSpan = document.getElementById('file-name');
    const loaderContainer = document.getElementById('loader-container'); // Container do loader
    const resultContent = document.getElementById('result-content'); // Conteúdo dos resultados
    const clearButton = document.getElementById('clear-btn');
    const dropZone = document.getElementById('drop-zone'); // A área de "arrastar e soltar"

    // --- NOVA LÓGICA ---
    // Função reutilizável para processar um ficheiro (seja por clique ou arrasto)
    const handleFile = (file) => {
        if (file) {
            // Valida o tipo de ficheiro
            if (file.type === 'text/plain' || file.type === 'application/pdf') {
                // Truque para atribuir o ficheiro arrastado ao input de ficheiro
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;

                fileNameSpan.textContent = `Ficheiro: ${file.name}`;
                emailTextInput.value = ''; // Limpa o texto
                emailTextInput.disabled = true; // Desativa o campo de texto
            } else {
                alert('Formato de ficheiro inválido. Por favor, use .txt ou .pdf.');
                fileInput.value = ''; // Limpa a seleção se for inválida
            }
        }
    };

    // --- NOVA LÓGICA DE "ARRASTAR E SOLTAR" ---

    // Previne o comportamento padrão do navegador para os eventos de arrasto
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    // Adiciona um destaque visual quando um ficheiro é arrastado sobre a área
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('border-orange-500', 'bg-orange-50');
        }, false);
    });

    // Remove o destaque visual quando o ficheiro sai da área
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('border-orange-500', 'bg-orange-50');
        }, false);
    });

    // Processa o ficheiro quando ele é solto na área
    dropZone.addEventListener('drop', (e) => {
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    }, false);
    
    // Também ativa a seleção de ficheiros ao clicar na drop zone
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // --- FIM DA NOVA LÓGICA ---


    // --- CÓDIGO EXISTENTE MODIFICADO ---

    // Mostra o nome do ficheiro quando selecionado pelo clique no input
    fileInput.addEventListener('change', () => {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    });
    
    // Limpa a seleção de ficheiro se o utilizador começar a escrever
    emailTextInput.addEventListener('input', () => {
        if (emailTextInput.value) {
            fileInput.value = '';
            fileNameSpan.textContent = '';
            emailTextInput.disabled = false;
        }
    });

    // Função para limpar os campos
    clearButton.addEventListener('click', () => {
        emailTextInput.value = '';
        fileInput.value = '';
        fileNameSpan.textContent = '';
        resultDiv.classList.add('hidden');
        emailTextInput.disabled = false;
    });

    // Evento de clique no botão de análise
    analyzeButton.addEventListener('click', async () => {
        const emailText = emailTextInput.value;
        const file = fileInput.files[0];

        if (!emailText && !file) {
            alert('Por favor, insira o texto de um e-mail ou selecione um ficheiro.');
            return;
        }

        // Mostra o loader e esconde os resultados anteriores
        loaderContainer.classList.remove('hidden');
        resultContent.classList.add('hidden'); // Esconde o conteúdo do resultado
        resultDiv.classList.remove('hidden'); // Mostra a área de resultado geral
        analyzeButton.disabled = true;

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        } else {
            formData.append('email_text', emailText);
        }

        try {
            const response = await fetch('http://localhost:5001/classify', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'Ocorreu um erro no servidor');
            }
            
            classificationSpan.textContent = data.classification || 'Não classificado';
            suggestionSpan.textContent = data.suggested_response || 'Nenhuma sugestão disponível.';
            
            resultContent.classList.remove('hidden'); // Mostra o conteúdo do resultado

        } catch (error) {
            console.error('Erro detalhado:', error);
            classificationSpan.textContent = 'Erro';
            suggestionSpan.textContent = `Ocorreu um erro: ${error.message}. Verifique o console para mais detalhes.`;
            
            resultContent.classList.remove('hidden'); // Mostra o conteúdo do erro
        } finally {
            loaderContainer.classList.add('hidden'); // Esconde o loader
            analyzeButton.disabled = false;
        }
    });
});