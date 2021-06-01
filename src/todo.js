import React from 'react';
import './todo.css';

class TODO extends React.Component{
  state = {
    list: [
      {name: "Resources", status: "resources", data:[{id: 1,name: "Finance & Growth Data"},{id: 2,name: "2017 Goals & KPIs"},{id: 3,name: "Brand Guide"},{id: 4,name: "Employee Manual"}]},
      {name: "ToDo", status: "todo", data: [{id: 5, name: "Build a better tommorow"},{id: 6,name: "Nacho Ordinary Birthday"}]},
      {name: "Doing", status: "doing", data: [{id: 7,name: "The Taco truck world tour"},{id: 8,name: "#NoFilter instagram campaing"}]},
      {name: "Done", status: "done", data: [{id: 9,name: "Focus group: Corn vs Flour Tourtiles"},{id: 10,name: "Eco friendly utensils and napkins"}]},
    ]
  };

  handleDragStart(event, data, currStatus){
    event.dataTransfer.setData("task", JSON.stringify({id:data.id, status: currStatus}));
  }

  handleDragOver = (event)=>{
    event.preventDefault();
  }
  handleOnDragEnter = (event)=>{
    if(event.target.className == "card"){
      event.target.style.boxShadow = "10px 10px 10px lightblue";
    }
  }

  handleDragLeave = (event)=>{
    if(event.target.className == "card"){
      event.target.style.boxShadow = "";
    }
  }
  
  handleDrop(event, list){
    event.preventDefault();
    var data = event.dataTransfer.getData("task");
    let obj = JSON.parse(data);
    event.target.style.boxShadow = "";
    let draggedFrom = this.state.list.find(el=> el.status == obj.status);
    let draggedIndex = draggedFrom.data.findIndex(d=> d.id == obj.id);
    if(draggedIndex != -1) {
      let targetId = event.target.id; 
      let droppedIndex = list.data.findIndex(d=> d.id == +targetId);
      if(droppedIndex != -1){
        if(list.status == obj.status){ // same row
          [list.data[draggedIndex], list.data[droppedIndex]] = [list.data[droppedIndex], list.data[draggedIndex]]
        }
        else{
          list.data.splice(droppedIndex, 0, draggedFrom.data[draggedIndex]);
          draggedFrom.data.splice(draggedIndex, 1);
        }
      }
    }
    
    this.forceUpdate();
  }
  render(){
    return (
      <div className="container">
        {this.state.list.map(list=>{
          return(          
            <div key={list.name} className="column">
              <p className="column-title">{list.name}</p>
              <div className="cards">
              {
                list.data.map(d=>{
                  return(
                    <div className="card" key={d.name} id={d.id} draggable={true} onDragStart={(e)=>this.handleDragStart(e, d, list.status)} onDragEnter={this.handleOnDragEnter} onDragLeave={this.handleDragLeave} onDragOver={this.handleDragOver} onDrop={(e)=>this.handleDrop(e, list)}>
                      <p>{d.name}</p>
                    </div>
                  )
                })
              }
              </div>
              <div className="add-container">
                <button className="add-card ui-button ui-corner-all">Add a card...</button>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default TODO;
