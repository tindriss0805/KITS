const bookingForm = document.querySelector('#booking-form');
const bookingFeedback = document.querySelector('#booking-feedback');
const dateInput = document.querySelector('#date');

function setMinDate() {
    if (!dateInput) {
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function createFeedbackMessage(name, service, date) {
    return `
        <h3>Tack ${name}!</h3>
        <p>Din bokning för <strong>${service}</strong> är registrerad för <strong>${date}</strong>.</p>
        <p>Vi återkommer inom 24 timmar med förslag på tid.</p>
    `;
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        const formData = new FormData(bookingForm);
        const name = formData.get('name').trim();
        const service = formData.get('service');
        const date = formData.get('date');

        if (bookingFeedback) {
            bookingFeedback.innerHTML = createFeedbackMessage(name, service, date);
            bookingFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        bookingForm.reset();
        setMinDate();
    });
}

window.addEventListener('load', setMinDate);
