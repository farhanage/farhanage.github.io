document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
            date: "2023-06-23",
            author: "Farhan Akhtar Gymnasiar",
            title: "Twitter Exploratory Data Analysis",
            description: "An EDA & Data Visualization Project, Colab Notebook",
            link: "https://colab.research.google.com/drive/19lkBVMYrTymAK9hGQdPR_iH4gEzzzgPa?usp=sharing"
        },
        {
            date: "2024-11-13",
            author: "Farhan Akhtar Gymnasiar, Mohammad Raffy Zeidan, Hilmy Rahmadani",
            title: "Antarctics Rain Volume Prediction",
            description: "Pekan Ristek 2024 Competition, Colab Notebook",
            link: "https://colab.research.google.com/drive/1083-G46CS8hlNboSJ5o3IjMQkgsSrGw8?usp=sharing"
        },
        {
            date: "2024-07-01",
            author: "Farhan Akhtar Gymnasiar, Mohammad Raffy Zeidan",
            title: "Graph Neural Network for Large Scale Dynamic Temporal Graph Anomaly Detection",
            description: "Ristek Datathon 2024 Competition, Medium",
            link: "https://medium.com/@farhanage/graph-neural-network-for-large-scale-dynamic-graph-anomaly-detection-209b1704392e"
        },
        {
            date: "2023-12-12",
            author: "Farhan Akhtar Gymnasiar",
            title: "Simple Air Quality Dashboard on Streamlit",
            description: "Streamlit Dashboard Project, Github",
            link: "https://github.com/farhanage/learning-streamlit_dashboard/tree/master"
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