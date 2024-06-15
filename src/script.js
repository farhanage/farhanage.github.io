document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            date: "2022-02-08",
            author: "Harlow Malloc",
            title: "Post With Code",
            description: "This is a post with executable code.",
            link: "Template-Project.html"
        },
        {
            date: "2022-02-05",
            author: "Tristan O’Malley",
            title: "Welcome To My Blog",
            description: "This is the first post in a Quarto blog. Welcome!",
            link: "project2.html"
        },
        {
            date: "2022-02-06",
            author: "Tristan O’Malley",
            title: "Aelcome To My Blog",
            description: "This is the first post in a Quarto blog. Welcome!",
            link: "project2.html"
        },
        {
            date: "2022-02-06",
            author: "Tristan O’Malley",
            title: "Aelcome To My Blog",
            description: "This is the first post in a Quarto blog. Welcome!",
            link: "project2.html"
        },
        {
            date: "2022-02-06",
            author: "Tristan O’Malley",
            title: "Aelcome To My Blog",
            description: "This is the first post in a Quarto blog. Welcome!",
            link: "project2.html"
        },
        {
            date: "2022-02-06",
            author: "Tristan O’Malley",
            title: "Aelcome To My Blog",
            description: "This is the first post in a Quarto blog. Welcome!",
            link: "project2.html"
        },
    ];

    const projectsPerPage = 5;
    let currentPage = 1;
    let currentOrder = "date";
    let currentFilter = "";

    function displayProjects(page) {
        const projectList = document.getElementById("project-list");
        projectList.innerHTML = "";

        const filteredProjects = projects
            .filter(project => project.title.toLowerCase().includes(currentFilter.toLowerCase()))
            .sort((a, b) => {
                if (currentOrder === "date") {
                    return new Date(b.date) - new Date(a.date);
                } else if (currentOrder === "title") {
                    return a.title.localeCompare(b.title);
                }
            });

        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        const paginatedProjects = filteredProjects.slice(start, end);

        paginatedProjects.forEach(project => {
            const projectItem = document.createElement("div");
            projectItem.className = "project-item";

            projectItem.innerHTML = `
                <a href="${project.link}">
                    <div class="project-date-author">
                        <span class="project-date">${new Date(project.date).toLocaleDateString()}</span>
                        <span class="project-author">${project.author}</span>
                    </div>
                    <div class="project-content">
                        <h2 class="project-title">${project.title}</h2>
                        <p class="project-description">${project.description}</p>
                    </div>
                </a>
            `;

            projectList.appendChild(projectItem);
        });

        displayPagination(filteredProjects.length);
    }

    function displayPagination(totalProjects) {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(totalProjects / projectsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.innerText = i;
            button.className = i === currentPage ? "active" : "";
            button.addEventListener("click", () => {
                currentPage = i;
                displayProjects(currentPage);
                displayPagination(totalProjects);
            });
            pagination.appendChild(button);
        }
    }

    document.getElementById("order-by").addEventListener("change", (event) => {
        currentOrder = event.target.value;
        displayProjects(currentPage);
    });

    document.getElementById("filter").addEventListener("input", (event) => {
        currentFilter = event.target.value;
        displayProjects(currentPage);
    });

    displayProjects(currentPage);
});