window.onload = function() {
            const form = document.getElementById('contact-form');
            const thank = document.querySelector('p.hide')

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                emailjs.sendForm('service_84alrqu', 'contact_form', this)
                    .then(() => {
                        console.log('SUCCESS!');
                        form.classList.remove("show");
                        form.classList.add("hide");
                        thank.classList.remove("hide")
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
            });
        }