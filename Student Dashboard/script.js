let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const searchInput = document.getElementById("search");

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable(data = students) {
  tableBody.innerHTML = "";

  data.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.regNo}</td>
      <td>${student.dept}</td>
      <td>${student.year}</td>
      <td>${student.marks}</td>
      <td class="actions">
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newStudent = {
    name: form.name.value.trim(),
    regNo: form.regNo.value.trim(),
    dept: form.dept.value.trim(),
    year: parseInt(form.year.value),
    marks: parseInt(form.marks.value),
  };

  // Check if editing
  if (form.dataset.index !== undefined) {
    students[form.dataset.index] = newStudent;
    delete form.dataset.index;
    form.querySelector("button").textContent = "Add Student";
  } else {
    students.push(newStudent);
  }

  form.reset();
  saveToStorage();
  renderTable();
});

function editStudent(index) {
  const student = students[index];
  form.name.value = student.name;
  form.regNo.value = student.regNo;
  form.dept.value = student.dept;
  form.year.value = student.year;
  form.marks.value = student.marks;
  form.dataset.index = index;
  form.querySelector("button").textContent = "Update Student";
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToStorage();
    renderTable();
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.regNo.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

renderTable();
