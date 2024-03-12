import React from 'react'
import './List.css'

function List({todolist, handleToggle, handleDelete}) {
  return (
    <ul className='list-group w-50 m-auto mt-5'>
    {todolist.map((listItem) => (
        <li key={listItem.id}
        className={listItem.done ? "list-group-item rounded-4 mb-3 bg-success-subtle p-4 list-shadow" :
        "list-group-item rounded-4 mb-3 shadow-sm p-4 not-done list-shadow"}>
          <span className='task-status'>
          {
                    listItem.done ? 
                    <i className="bi bi-check-circle-fill text-success me-2" onClick={() => handleToggle(listItem.id)}></i> :
                    <i className="bi bi-circle me-2" onClick={() => handleToggle(listItem.id)}></i> 
                }
          </span>
            <span className={listItem.done ? "text-decoration-line-through" : ""}>{listItem.item}</span>
            <span className='actions float-end'>            
            <i className="bi bi-trash3-fill text-danger" onClick={() => handleDelete(listItem.id)}></i>
            </span>
        </li>
    ))}
  </ul>
  )
}

export default List