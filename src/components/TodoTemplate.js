import React, { useEffect, useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import './scss/TodoTemplate.scss';
import { json } from 'react-router-dom';

const TodoTemplate = () => {
  //서버에 할 일 목록(json_)을 요청(fetch)해서 받아와야 함. --> 나중에 하자
  const API_BASE_URL = 'http://localhost:8181/api/todos';

  //todos배열을 상태 관리
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   title: '아침 산책하기',
    //   done: true,
    // },
    // {
    //   id: 2,
    //   title: '오늘 주간 신문 읽기',
    //   done: true,
    // },
    // {
    //   id: 3,
    //   title: '샌드위치 사먹기',
    //   done: false,
    // },
    // {
    //   id: 4,
    //   title: '리액트 복습하기',
    //   done: false,
    // },
  ]);

  //id  가 시퀀스 함수(DB 연동시키면 필요없게 됨)
  const makeNewId = () => {
    if (todos.length === 0) return 1;
    return todos[todos.length - 1].id + 1; //맨 마지막 할일 객체의 id 보다 하나 크게
  };

  /*
    todoInput에게 todoText를 받아오는 함수
    자식 컴포넘트가 부모컴포넘트에게 데이타를 전달할 때는
    일반적인 props 사용이 불가능.
    부모 컴포넌트에서 함수를 선언(매개변수 꼭 선언) -> props로 함수를 전달
    자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달
  */
  const addTodo = (todoText) => {
    const newTodo = {
      // id: makeNewId(), 이건 test 용으로 생성한 것 . 실제 db 생성에서는 필요 없다.
      title: todoText,
      // done: false, 이건 db 가 없어 test 용으로 생성한 것,실제 db 생성에서는 필요 없다.
    }; // fetch를 이용해서 백엔드에 insert 요청 보내야 함.

    // todos.push(newTodo);(x) -> useState변수는 setter로 변경
    // setTodos(newTodo);(x)
    // setTodos(todos.push(newTodo));(x) ==>리액트의 상태변수는 불변성(immutable)을
    //가지기 때문에 기존 상테에서는 변경 불가능 -> 새로운 상태로 만들어서 변경해야 한다.

    // setTodos((oldTodos) => {
    //   return [...oldTodos, newTodo];
    // });

    fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.todos);
      });
  };

  //할일 삭제 처리 함수
  const removeTodo = (id) => {
    //주어진 배열의 값들을 순회하여 조건에 맞는 요소들만 모아서 새로운 배열로 리턴.
    // setTodos(todos.filter((todo) => todo.id !== id));이건 db 가 없어 test 용으로 생성한 것,실제 db 생성에서는 필요 없다.

    fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.todos);
      });
  };

  // 할 일 체크 처리 함수
  const checkTodo = (id, done) => {
    /*
    const copyTodos = [...todos];
    for (let cTodo of copyTodos) {
      if (cTodo.id === id) {
        cTodo.done = !cTodo.done;
      }
    }
    setTodos(copyTodos);
    

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
   */

    const newTodo = {
      id: id,
      done: !done,
    };
    fetch(API_BASE_URL, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      // body: JSON.stringify(newTodo), 이렇게 해도 된다
      body: JSON.stringify({
        done: !done,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.todos);
      });
  };

  //체크가 안된 할 일의 개수 카운트 하기
  const countRestTodo = () => todos.filter((todo) => !todo.done).length;

  // 화면 뜨자 마자 자동 랜더링. [] 안에 아무것도 없으면 한번만 랜더링
  //페이지가 처음 랜더링 됨과 동시에 할 일 목록을 서버에 요청해서 뿌려 주겠다.
  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        //fetch  를 통해 받아온 데이터를 상태 변수에 할당.
        setTodos(json.todos);
      });
  }, []);

  return (
    <div className='TodoTemplate'>
      <TodoHeader count={countRestTodo} />
      <TodoMain
        todoList={todos}
        remove={removeTodo}
        check={checkTodo}
      />
      <TodoInput addTodo={addTodo} />
    </div>
  );
};

export default TodoTemplate;
