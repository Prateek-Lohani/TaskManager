import React, { useState } from 'react';

const TaskList = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [viewInput, setViewInput] = useState(null); // Modified to hold projectId
  // const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editProjectId, setEditProjectId] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editTaskName, setEditTaskName] = useState('');

  const handleNewProjectChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleNewTaskChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleAddProject = () => {
    if (newProjectName.trim() !== '') {
      const newProject = {
        id: Date.now(),
        name: newProjectName,
        description: newProjectDescription,
        tasks: [],
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
      setShowModal(false); // Close the modal after adding project
    }
  };

  const handleAddTask = (projectId) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex !== -1 && newTaskName.trim() !== '') {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks.push({
        id: Date.now(),
        name: newTaskName,
        completed: false,
      });
      setProjects(updatedProjects);
      setNewTaskName('');
      setViewInput(null); // Reset viewInput after adding task
    }
  };

  const handleNewProjectDescriptionChange = (e) => {
    setNewProjectDescription(e.target.value);
  };

  const handleEditProject = (projectId) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].name = editProjectName;
      updatedProjects[projectIndex].description = editProjectDescription;
      setProjects(updatedProjects);
      setEditProjectId(null);
      setEditProjectName('');
      setEditProjectDescription('');
    }
  };

  const handleEditTaskName = (projectId, taskId) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex !== -1) {
      const taskIndex = projects[projectIndex].tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].tasks[taskIndex].name = editTaskName;
        setProjects(updatedProjects);
        setEditTaskId(null);
        setEditTaskName('');
      }
    }
  };

  const handleTaskCompletion = (projectId, taskId) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      const taskIndex = updatedProjects[projectIndex].tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        updatedProjects[projectIndex].tasks[taskIndex].completed = true;
        setProjects(updatedProjects);
      }
    }
  };

  const handleDeleteTask = (projectId, taskId) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks = updatedProjects[projectIndex].tasks.filter(
        (task) => task.id !== taskId
      );
      setProjects(updatedProjects);
    }
  };

  return (
    <div className='w-full h-full'>
      <h2 className='text-center text-xl text-white'>Project Management Dashboard</h2>
      <div className='flex justify-center mt-4 gap-3 mb-4 '>
        <button className='px-4 py-4 bg-blue-300 rounded-lg text-white' onClick={() => setShowModal(true)}>Add a New Project</button>
      </div>
      {showModal && (
        <div className="modal w-[20vw] py-1 mx-auto min-h-[20vh] rounded bg-black/30">
          <div className="modal-content flex gap-2 flex-col items-center">
            <span className="close text-red-600 text-center font-semibold" onClick={() => setShowModal(false)}>Cancel</span>
            <input type='text' value={newProjectName} placeholder='Project Name' onChange={handleNewProjectChange} className='rounded-lg px-3 w-[15vw] h-[5vh]'></input>
            <textarea value={newProjectDescription} placeholder='Project Description' onChange={handleNewProjectDescriptionChange} className='rounded-lg px-3 text-black w-[15vw] h-[10vh]'></textarea>
            <button className='bg-blue-400 px-3 py-1 rounded-md font-semibold' onClick={handleAddProject}>Add Project</button>
          </div>
        </div>
      )}
      <div className='w-full flex flex-wrap gap-20 h-[80vh]'>
        {projects.length === 0 ? (
          <p className='text-xl text-center text-white font-bold mx-auto'>No Projects to display..</p>
        ) : (
          projects.map((project) => (
            <div key={project.id}>
              <div className='text-center text-black hover:border hover:border-1 hover:border-white min-w-[12vw] min-h-[3vw] p-2 bg-cyan-600 rounded'>
                {editProjectId === project.id ? (
                  <div>
                    <input value={editProjectName} onChange={(e) => setEditProjectName(e.target.value)} autoFocus />
                    <textarea value={editProjectDescription} onChange={(e) => setEditProjectDescription(e.target.value)} />
                    <button onClick={() => handleEditProject(project.id)}>Save</button>
                  </div>
                ) : (
                  <div onDoubleClick={() => setEditProjectId(project.id)}>
                    <p>Project :<span className='font-light text-normal'> {project.name}</span></p>
                    <p className='text-green-400'><span className='text-black text-xs'>{project.description}</span> </p>
                  </div>
                )}
              </div>
              <div>
                <button className='mt-1 px-2 py-1 bg-green-200 rounded-lg' onClick={() => setViewInput(project.id)}>Add Task</button>
                {viewInput === project.id && (
                  <div className='flex items-center gap-1'>
                    <input
                      className='ml-5 h-8 px-2 mt-[1vh] rounded-lg'
                      type="text"
                      placeholder="Enter task name"
                      value={newTaskName}
                      onChange={handleNewTaskChange}
                    />
                    <button className='px-2 flex h-8 py-0 bg-blue-600 justify-center items-center font-semibold rounded' onClick={() => handleAddTask(project.id)}>+</button>
                  </div>
                )}
              </div>
              <ul>
                {project.tasks.map((task) => (
                  <li className='mt-2 ml-5 flex items-center gap-2' key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(project.id, task.id)}
                    />
                    <span className='flex text-blue-700 items-center gap-1'>
                      {editTaskId === task.id ? (
                        <input value={editTaskName} onChange={(e) => setEditTaskName(e.target.value)} autoFocus />
                      ) : (
                        <span onDoubleClick={() => setEditTaskId(task.id)}>
                           - {task.name}
                        </span>
                      )}
                    </span>
                    <button className='px-2 flex py-1 justify-center items-center font-semibold rounded-lg bg-red-400' onClick={() => handleDeleteTask(project.id, task.id)}>x</button>
                    <button className='px-2 flex py-1 justify-center items-center font-semibold rounded-lg bg-green-400' onClick={() => handleEditTaskName(project.id, task.id)}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
