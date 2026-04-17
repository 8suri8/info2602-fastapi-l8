async function displayTodos(data){

  let result = document.querySelector('#result');//access the DOM

  result.innerHTML = '';//clear result area
  
  let html = '';//make an empty html string 

  if("error" in data){//user not logged in 
    html+= `
      <li class="card collection-item col s12 m4">
                <div class="card-content">
                  <span class="card-title">
                    Error : Not Logged In
                  </span>
                </div>
        </li>
    `;
  }else{
    for(let todo of data){
      html+= `
        <li class="card collection-item col s12 m4">
                  <div class="card-content">
                    <span class="card-title">${todo.text}
                      <label class="right">
                        <input type="checkbox" data-id="${todo.id}" onclick="toggleDone(event)" ${todo.done ? 'checked': ''} />
                        <span>Done</span>
                      </label>
                    </span>
                  </div>
                  <div class="card-action">
                    <a href="#" onclick="deleteTodo('${todo.id}')">DELETE</a>
                  </div>
          </li>
      `;//create html for each todo data by interpolating the values in the todo
    }
  }
  
  //add the dynamic html to the DOM
  result.innerHTML = html;
}

async function loadView(){
  let todos = await sendRequest(`${server}/todo`, 'GET');
  displayTodos(todos);
}

loadView();
