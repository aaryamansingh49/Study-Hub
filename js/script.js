// Sample course data
const courses = [
    { name: "Object Oriented Programming", type: "worksheet" },
    { name: "Database Management System", type: "worksheet" },
    { name: "Java Mini Project", type: "project" },
    { name: "Web Development Project", type: "project" }
];

const container = document.getElementById("courseContainer");
const worksheetCount = document.getElementById("worksheetCount");
const projectCount = document.getElementById("projectCount");

// Display courses
function loadCourses(data) {
    container.innerHTML = "";
    data.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.type}</p>
            <button>View</button>
        `;
        container.appendChild(card);
    });
}

// Count logic
const worksheets = courses.filter(c => c.type === "worksheet").length;
const projects = courses.filter(c => c.type === "project").length;

worksheetCount.textContent = worksheets;
projectCount.textContent = projects;

loadCourses(courses);

// Search Function
document.getElementById("searchInput").addEventListener("keyup", function() {
    const value = this.value.toLowerCase();
    const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(value)
    );
    loadCourses(filtered);
});

// Dark Mode
document.getElementById("darkToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});