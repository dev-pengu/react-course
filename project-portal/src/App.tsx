import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject, { type ProjectInputData } from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";
import { useState, type ReactElement } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

export type Task = {
  text: string;
  projectId: number;
  id: number;
};

export type ProjectState = {
  selectedProjectId: number | undefined | null;
  projects: Project[];
  tasks: Task[];
};

function App() {
  const [projectState, setProjectState] = useState<ProjectState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text: string) => {
    if (text?.trim() === "") return;

    const id = Math.random();
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          { id: id, projectId: prevState.selectedProjectId!, text: text },
        ],
      };
    });
  };

  const handleDeleteTask = (id: number) => {
    if (id === null || id === undefined) return;

    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  const handleAddProject = (formData: ProjectInputData) => {
    const id = Math.random();
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, { id: id, ...formData }],
        selectedProjectId: id,
      };
    });
  };

  const handleDeleteProject = (id: number) => {
    if (id === null || id === undefined) return;

    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.projectId !== id),
        projects: prevState.projects.filter((project) => project.id !== id),
        selectedProjectId: undefined,
      };
    });
  };

  const handleOpenNewProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleSetProjectId = (id: number) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId,
  );

  let projectContent: ReactElement | null = null;

  if (selectedProject !== null && selectedProject !== undefined) {
    projectContent = (
      <SelectedProject
        project={selectedProject}
        onTaskAdd={handleAddTask}
        onTaskDelete={handleDeleteTask}
        onProjectDelete={handleDeleteProject}
        tasks={projectState.tasks.filter(
          (task) => task.projectId === selectedProject.id,
        )}
      />
    );
  } else if (projectState.selectedProjectId === null) {
    projectContent = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    projectContent = (
      <NoProjectSelected onAddNewProject={handleOpenNewProject} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={projectState.projects}
        onProjectClick={handleSetProjectId}
        onAddNewProject={handleOpenNewProject}
      />
      {projectContent}
    </main>
  );
}

export default App;
