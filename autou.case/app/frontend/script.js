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
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('border-orange-500', 'bg-orange-50');
        }, false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('border-orange-500', 'bg-orange-50');
        }, false);
    });
    dropZone.addEventListener('drop', (e) => {
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    }, false);
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
    fileInput.addEventListener('change', () => {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    });
    emailTextInput.addEventListener('input', () => {
        if (emailTextInput.value) {
            fileInput.value = '';
            fileNameSpan.textContent = '';
            emailTextInput.disabled = false;
        }
    });
    clearButton.addEventListener('click', () => {
        emailTextInput.value = '';
        fileInput.value = '';
        fileNameSpan.textContent = '';
        resultDiv.classList.add('hidden');
        emailTextInput.disabled = false;
    });
    
    analyzeButton.addEventListener('click', async () => {
        const emailText = emailTextInput.value;
        const file = fileInput.files[0];

        if (!emailText && !file) {
            alert('Por favor, insira o texto de um e-mail ou selecione um ficheiro.');
            return;
        }
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
            // URL do backend deploy Render
            const response = await fetch('https://autou-backend-9nqg.onrender.com/classify', {
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
            
            resultContent.classList.remove('hidden'); 
        } finally {
            loaderContainer.classList.add('hidden'); 
            analyzeButton.disabled = false;
        }
    });
});
