// TaskList.js
import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, onUpdate, onToggleDone }) => {
  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one to get started!</p>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskCard
              key={task._id || task.id || Math.random()}
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onToggleDone={onToggleDone}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;