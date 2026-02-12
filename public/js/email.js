
window.onload = function() {
            const form = document.getElementById('contact-form');
            const thank = document.querySelector('.thank')

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                emailjs.sendForm('service_84alrqu', 'contact_form', this)
                    .then(() => {
                        console.log('SUCCESS!');
                        form.classList.add("hide");
                        thank.classList.remove("thank")
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
            });
        }