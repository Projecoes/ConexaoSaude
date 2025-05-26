// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Slider de Campanhas
    if (document.querySelector('.campanha-slider')) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }
    
    // Chatbot no Agendamento
    if (document.getElementById('abrir-chatbot')) {
        const chatbotModal = document.getElementById('chatbot-modal');
        const abrirChatbot = document.getElementById('abrir-chatbot');
        const closeModal = document.querySelector('.close-modal');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-user-input');
        const chatbotMessages = document.getElementById('chatbot-messages');
        
        abrirChatbot.addEventListener('click', () => {
            chatbotModal.style.display = 'flex';
        });
        
        closeModal.addEventListener('click', () => {
            chatbotModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === chatbotModal) {
                chatbotModal.style.display = 'none';
            }
        });
        
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'user-message';
                userMessage.textContent = message;
                chatbotMessages.appendChild(userMessage);
                
                // Bot response
                setTimeout(() => {
                    const botResponse = document.createElement('div');
                    botResponse.className = 'bot-message';
                    
                    if (message.toLowerCase().includes('agendamento') || message.toLowerCase().includes('marcar')) {
                        botResponse.textContent = 'Para agendar uma consulta, preencha o formulário ao lado com seus dados e preferências. Posso te ajudar com alguma dúvida específica sobre o agendamento?';
                    } else if (message.toLowerCase().includes('horário') || message.toLowerCase().includes('horario')) {
                        botResponse.textContent = 'Nossos horários de atendimento são de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.';
                    } else if (message.toLowerCase().includes('telemedicina')) {
                        botResponse.textContent = 'Sim, oferecemos consultas por telemedicina. Basta marcar a opção "Prefiro consulta por telemedicina" no formulário de agendamento.';
                    } else {
                        botResponse.textContent = 'Desculpe, não entendi. Você pode reformular sua pergunta ou perguntar sobre agendamentos, horários ou telemedicina.';
                    }
                    
                    chatbotMessages.appendChild(botResponse);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 1000);
                
                chatbotInput.value = '';
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }
    }
    
    // Novo Tópico na Comunidade
    if (document.getElementById('novo-topico')) {
        const novoTopicoBtn = document.getElementById('novo-topico');
        const novoTopicoModal = document.getElementById('novo-topico-modal');
        const closeModal = novoTopicoModal.querySelector('.close-modal');
        
        novoTopicoBtn.addEventListener('click', () => {
            novoTopicoModal.style.display = 'flex';
        });
        
        closeModal.addEventListener('click', () => {
            novoTopicoModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === novoTopicoModal) {
                novoTopicoModal.style.display = 'none';
            }
        });
        
        document.getElementById('form-topico').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Tópico criado com sucesso! Ele será moderado antes de aparecer no fórum.');
            novoTopicoModal.style.display = 'none';
            this.reset();
        });
    }
    
    // Mensagem Anônima na Comunidade
    if (document.getElementById('enviar-anonimo')) {
        document.getElementById('enviar-anonimo').addEventListener('click', function() {
            const mensagem = document.getElementById('mensagem-anonima').value.trim();
            if (mensagem) {
                alert('Mensagem enviada anonimamente. Um profissional entrará em contato em breve.');
                document.getElementById('mensagem-anonima').value = '';
            } else {
                alert('Por favor, escreva sua mensagem antes de enviar.');
            }
        });
    }

    
    function OvoEsquerdo() {
        console.log('VAPO')
    }
    
    // Quiz no Guia de Cuidados
    if (document.getElementById('iniciar-quiz')) {

        const quizQuestions = [
            {
                question: "Com que frequência você pratica atividade física?",
                options: [
                    "Diariamente",
                    "3-4 vezes por semana",
                    "Raramente",
                    "Nunca"
                ],
                scores: [3, 2, 1, 0]
            },
            {
                question: "Como você avalia sua alimentação?",
                options: [
                    "Muito saudável - como muitas frutas e vegetais",
                    "Razoável - tento comer bem, mas não sempre",
                    "Pouco saudável - como muitos alimentos processados",
                    "Não me preocupo com isso"
                ],
                scores: [3, 2, 1, 0]
            },
            {
                question: "Quantas horas você dorme por noite em média?",
                options: [
                    "7-8 horas",
                    "6 horas",
                    "5 horas ou menos",
                    "Meu sono é muito irregular"
                ],
                scores: [3, 2, 1, 0]
            }
        ];
        
        const iniciarQuizBtn = document.getElementById('iniciar-quiz');
        const quizPerguntaDiv = document.getElementById('quiz-pergunta');
        const quizQuestionsDiv = document.getElementById('quiz-questions');
        const quizResultDiv = document.getElementById('quiz-result');
        
        let currentQuestion = 0;
        let totalScore = 0;
        
        iniciarQuizBtn.addEventListener('click', startQuiz);
        
        function startQuiz() {
            quizPerguntaDiv.style.display = 'none';
            quizQuestionsDiv.style.display = 'block';
            showQuestion();
        }
        
        function showQuestion() {
            if (currentQuestion >= quizQuestions.length) {
                showResult();
                return;
            }
            
            const question = quizQuestions[currentQuestion];
            quizQuestionsDiv.innerHTML = `
                <div class="quiz-question">
                    <h4>${question.question}</h4>
                    <div class="quiz-options" id="quiz-options">
                        ${question.options.map((option, index) => `
                            <div class="quiz-option" data-index="${index}">${option}</div>
                        `).join('')}
                    </div>
                    <div class="quiz-navigation">
                        ${currentQuestion > 0 ? '<button id="quiz-prev" class="btn-small">Anterior</button>' : '<div></div>'}
                        <button id="quiz-next" class="btn-small">${currentQuestion === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima'}</button>
                    </div>
                </div>
            `;
            
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    options.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
            
            if (currentQuestion > 0) {
                document.getElementById('quiz-prev').addEventListener('click', prevQuestion);
            }
            
            document.getElementById('quiz-next').addEventListener('click', nextQuestion);
        }
        
        function nextQuestion() {
            const selectedOption = document.querySelector('.quiz-option.selected');
            if (!selectedOption) {
                alert('Por favor, selecione uma opção antes de continuar.');
                return;
            }
            
            const optionIndex = parseInt(selectedOption.dataset.index);
            totalScore += quizQuestions[currentQuestion].scores[optionIndex];
            currentQuestion++;
            showQuestion();
        }
        
        function prevQuestion() {
            currentQuestion--;
            totalScore = 0; // Reset score for simplicity
            showQuestion();
        }
        
        function showResult() {
            quizQuestionsDiv.style.display = 'none';
            quizResultDiv.style.display = 'block';
            
            let message = '';
            if (totalScore >= 8) {
                message = 'Parabéns! Seus hábitos de saúde são excelentes. Continue assim!';
            } else if (totalScore >= 5) {
                message = 'Você está no caminho certo, mas pode melhorar em algumas áreas. Tente incluir mais atividades físicas e alimentos saudáveis na sua rotina.';
            } else {
                message = 'Sua saúde pode estar em risco. Considere fazer mudanças em seu estilo de vida e consultar um profissional de saúde.';
            }
            
            quizResultDiv.innerHTML = `
                <h4>Seu Resultado: ${totalScore} pontos</h4>
                <p>${message}</p>
                <p>Com base nas suas respostas, recomendamos:</p>
                <ul>
                    <li>Praticar pelo menos 30 minutos de atividade física diária</li>
                    <li>Consumir pelo menos 5 porções de frutas e vegetais por dia</li>
                    <li>Dormir 7-8 horas por noite</li>
                </ul>
                <button id="quiz-restart" class="btn">Fazer Novamente</button>
            `;
            
            document.getElementById('quiz-restart').addEventListener('click', restartQuiz);
        }
        
        function restartQuiz() {
            currentQuestion = 0;
            totalScore = 0;
            quizResultDiv.style.display = 'none';
            quizPerguntaDiv.style.display = 'block';
        }
    }
    
    // Formulário de Agendamento
    if (document.getElementById('form-agendamento')) {
        document.getElementById('form-agendamento').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Solicitação de agendamento enviada com sucesso! Nossa equipe entrará em contato em breve para confirmar os detalhes.');
            this.reset();
        });
    }
    
    // Categorias no Guia de Cuidados
    if (document.querySelectorAll('.categoria-card')) {
        document.querySelectorAll('.categoria-card').forEach(card => {
            card.addEventListener('click', function() {
                const categoria = this.dataset.categoria;
                alert(`Você selecionou a categoria: ${this.querySelector('h3').textContent}. Em uma versão completa, isso filtraria os materiais.`);
            });
        });
    }
});