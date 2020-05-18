    
    // DOMContentLoaded - Отрабатывает когда все элементы загружены
    document.addEventListener('DOMContentLoaded', function() {
        const btnOpenModal = document.querySelector('#btnOpenModal');
        const modalBlock = document.querySelector('#modalBlock');
        const closeModel = document.querySelector('#closeModal');
        const questionTitle = document.querySelector('#question');
        const formAnswers = document.querySelector('#formAnswers');
        const nextButton = document.querySelector('#next');
        const prevButton = document.querySelector('#prev');
        const sendButton = document.querySelector('#send');

        const questions = [
            {
                question: "Какого цвета бургер?",
                answers: [
                    {
                        title: 'Стандарт',
                        url: './image/burger.png'
                    },
                    {
                        title: 'Черный',
                        url: './image/burgerBlack.png'
                    }
                ],
                type: 'radio'       // Выбор одного элемента
            },
            {
                question: "Из какого мяса котлета?",
                answers: [
                    {
                        title: 'Курица',
                        url: './image/chickenMeat.png'
                    },
                    {
                        title: 'Говядина',
                        url: './image/beefMeat.png'
                    },
                    {
                        title: 'Свинина',
                        url: './image/porkMeat.png'
                    }
                ],
                type: 'radio'       // Выбор одного элемента
            },
            {
                question: "Дополнительные ингредиенты?",
                answers: [
                    {
                        title: 'Помидор',
                        url: './image/tomato.png'
                    },
                    {
                        title: 'Огурец',
                        url: './image/cucumber.png'
                    },
                    {
                        title: 'Салат',
                        url: './image/salad.png'
                    },
                    {
                        title: 'Лук',
                        url: './image/onion.png'
                    }
                ],
                type: 'checkbox'    // Выбор нескольких элементов
            },
            {
                question: "Добавить соус?",
                answers: [
                    {
                        title: 'Чесночный',
                        url: './image/sauce1.png'
                    },
                    {
                        title: 'Томатный',
                        url: './image/sauce2.png'
                    },
                    {
                        title: 'Горчичный',
                        url: './image/sauce3.png'
                    }
                ],
                type: 'radio'       // Выбор одного элемента
            }
        ];

        // Открыть окно
        btnOpenModal.addEventListener('click', () => {
            modalBlock.classList.add('d-block');
            playTest();
        });

        // Закрыть окно
        closeModel.addEventListener('click', () => {
            modalBlock.classList.remove('d-block');
        });

        const playTest = () => {            // Основная функция
            
            const finalAnswers = [];
            let numberQuestion = 0;         // Переменная с номером вопроса

            const renderAnswers = (index) => {   // Создает ответы
                questions[index].answers.forEach((answer) => { // Получаем ответы, не зависимо от количества в обЪекте
                    const answerItem = document.createElement('div');
                   
                    answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                    
                    answerItem.innerHTML = `
                        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                        </label>
                    `;
                    formAnswers.appendChild(answerItem);
                })
            }

            const renderQuestions = (indexQuestion) => { // Вписывает информацию в блок с ответами
                formAnswers.innerHTML = ''; // Очистка

                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    prevButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                }
                if(numberQuestion === 0) {                    // Если первый вопрос отключается левая кнопка
                    prevButton.classList.add('d-none');  
                }

                if(numberQuestion === questions.length) {    // Окно благодарности
                    nextButton.classList.add('d-none');
                    prevButton.classList.add('d-none');      // Если последний вопрос - отключается правая кнопка
                    sendButton.classList.remove('d-none');
                    
                    formAnswers.innerHTML = `
                        <div class="form-group">
                            <label for="numberPhone">Enter your number</label>
                            <input type="phone" class="form-control" id="numberPhone">
                        </div>
                    `;
                }

                if(numberQuestion === questions.length + 1) {
                    formAnswers.textContent = 'Спасибо за пройденый тест!';
                    setTimeout(() => {
                      modalBlock.classList.remove('d-block');
                    }, 2000);
                }
                
            }
            renderQuestions(numberQuestion); // Запуск функции рендеринга
            
            const checkAnswer = () => {      // Финальная функция
                const obj = {};
                                // [...formAnswers.elements] - достать элементы из массива elements и закинуть в новый
                const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

                inputs.forEach((input, index) => {
                    if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                        obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                    }
                    if(numberQuestion === questions.length) {
                        obj['Номер телефона'] = input.value;
                    }
                });

                finalAnswers.push(obj);
            }
            
            nextButton.onclick = () => {    // Кнопка влево
                checkAnswer();
                numberQuestion++;
                renderQuestions(numberQuestion);
            }

            prevButton.onclick = () => {    // Кнопка вправо
                numberQuestion--;
                renderQuestions(numberQuestion);
            }

            sendButton.onclick = () => {    // Кнопка отправки
                checkAnswer();
                numberQuestion++;
                renderQuestions(numberQuestion);
            }
        }
    });
