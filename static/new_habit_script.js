const modal = document.getElementById("habitModal");

const openBtn = document.getElementById("openHabitModal");
const closeBtn = document.getElementById("closeHabitModal");
const cancelBtn = document.getElementById("cancelHabit");

const settings = document.getElementById("recurrenceSettings");


/* Open Modal */

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
});


/* Close Modal */

function closeModal() {
    modal.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);


/* Close when clicking outside */

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


/* Dynamic Recurrence Settings */

document.querySelectorAll('input[name="recurrence"]')
.forEach(radio => {

    radio.addEventListener("change", () => {

        const value = radio.value;

        let html = "";

        if (value === "daily") {

            html = `
                <div class="dynamic-settings">
                    <p>This task will repeat every day.</p>
                </div>
            `;

        }

        else if (value === "weekly") {

            html = `
                <div class="dynamic-settings">
                    <label>Select weekdays</label>

                    <div class="weekday-options">
                        ${["Monday", "Tuesday", "Wednesday",
                           "Thursday", "Friday", "Saturday",
                           "Sunday"].map(day => `
                            <label>
                                <input type="checkbox"
                                       name="weekdays"
                                       value="${day.toLowerCase()}">
                                <span>${day.slice(0, 3)}</span>
                            </label>
                        `).join("")}
                    </div>
                </div>
            `;

        }

        else if (value === "monthly") {

            html = `
                <div class="dynamic-settings">
                    <label>Day of the month</label>
                    <input type="number"
                           name="month_day"
                           min="1"
                           max="31"
                           value="1">
                </div>
            `;

        }

        else if (value === "specific_days") {

            html = `
                <div class="dynamic-settings">
                    <label>Select specific dates</label>
                    <input type="date"
                           name="specific_dates"
                           multiple>
                    <p>Select the dates on which this task should occur.</p>
                </div>
            `;

        }

        else if (value === "interval") {

            html = `
                <div class="dynamic-settings">
                    <label>Repeat every</label>

                    <input type="number"
                           name="interval"
                           min="1"
                           value="2">

                    <select name="interval_unit">
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                    </select>
                </div>
            `;

        }

        settings.innerHTML = html;

    });

});