    document.addEventListener('DOMContentloaded', function() {
        const btnOpenModal = document.querySelector('#btnOpenModal');
        const modalBlock = document.querySelector('#modalBlock');

        btnOpenModal.addEventListener('click', () => {
            modalBlock.classList.add('d-block');
        })
    });

    console.log('sdsd');