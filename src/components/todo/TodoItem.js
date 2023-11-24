import React from 'react';
import { MdDelete, MdDone } from 'react-icons/md';
import cn from 'classnames';

import './scss/TodoItem.scss';

const TodoItem = ({ item, remove, check }) => {
  const { id, title, done } = item;
  return (
    <li className='todo-list-item'>
      <div
        className={cn('check-circle', { active: done })} //active 라는 클래스를 땠다 붙였다..
        onClick={() => check(id, done)}
      >
        <MdDone />
      </div>
      <span className={cn('text', { finish: done })}>{title}</span>
      <div
        className='remove'
        onClick={() => remove(id)}
      >
        <MdDelete />
      </div>
    </li>
  );
};

export default TodoItem;
