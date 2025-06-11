// Menu Telas Pequenas
document.addEventListener('DOMContentLoaded', function() {
    const buttonDropdown = document.getElementById('button-dropdown');
    const menuDropdown = document.getElementById('menu-dropdown');
    console.log(menuDropdown); 

    //Abre e fecha ao clicar no button
    buttonDropdown.addEventListener('click', function() {
        menuDropdown.classList.toggle('show');
        console.log(menuDropdown); 
    });

     // Fecha ao clicar no próprio menu
     menuDropdown.addEventListener('click', function () {
        menuDropdown.classList.remove('show');
        console.log(menuDropdown); 
    });

    // Fecha ao sair com o mouse de cima do menu
    menuDropdown.addEventListener('mouseleave', function () {
        menuDropdown.classList.remove('show');
        console.log(menuDropdown); 
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
        
        // Tempo de torca de slide: 5s
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
                // Mensagem do user
                const userMessage = document.createElement('div');
                userMessage.className = 'user-message';
                userMessage.textContent = message;
                chatbotMessages.appendChild(userMessage);
                
                // Resposta do chat
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
                alert('Mensagem enviada anonimamente. Agradecemos pelo seu apoio.');
                document.getElementById('mensagem-anonima').value = '';
            } else {
                alert('Por favor, escreva sua mensagem antes de enviar.');
            }
        });
    }
    
    // Formulário de Agendamento
    if (document.getElementById('form-agendamento')) {

        function justNumbers(input) {
            console.log("telefone" + input.value.replace(/[^0-9]/g, ''));
            return input.value.replace(/[^0-9]/g, '');
          }

        function validarEmail() {
            const email = document.getElementById('forms-email');
            const emailRegex = /\S+@\S+\.\S+/;
            
            if (emailRegex.test(email.value)) {
                email.setCustomValidity("");
                email.reportValidity(true);
                return true;
            } else {
                email.setCustomValidity('Por favor, insira um endereço de email válido.');
                email.reportValidity(false);
                email.focus();
                return false;
            }
        }

        function validarTelefone() {
            const telefone = document.getElementById('forms-telefone');
            const numeros = justNumbers(telefone);

            if (telefone.validity.valid && (numeros.length == 10 || numeros.length == 11)) {
                telefone.setCustomValidity("");
                telefone.reportValidity(true);
                return true;
            } else {
                telefone.setCustomValidity('Por favor, insira um telefone inválido com 10 ou 11 dígitos.');
                telefone.reportValidity(false);
                telefone.focus();
                return false;
            }
        }
        
        document.getElementById('form-agendamento').addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarEmail() && validarTelefone()){
                alert('Solicitação de agendamento enviada com sucesso! Nossa equipe entrará em contato em breve para confirmar os detalhes.');
                this.reset();
            }
        });
    }
    
    // Categorias no Guia de Cuidados
    if (document.querySelectorAll('.categoria-card')) {
        document.querySelectorAll('.categoria-card').forEach(card => {
            card.addEventListener('click', function() {
                const categoria = this.dataset.categoria;
                alert(`Você selecionou a categoria: ${this.querySelector('p').textContent}. Em uma versão completa, isso filtraria os materiais.`);
            });
        });
    }
});