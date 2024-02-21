const form=document.querySelector("form")
const ul=document.querySelector("ul")

form.addEventListener("submit",handleSubmit)
 window.addEventListener("DOMContentLoaded",handleGetData)
 function handleGetData(){
    
    axios.get("https://crudcrud.com/api/90250ca682df47239e50828ee5bf665d/flipkart").then((res)=>dispalyItem(res.data)).catch((err)=>alert("error found in backend api"))
     
 }

function handleSubmit (event){
    event.preventDefault()
    let data={
        price:form.elements[0].value,
        productName:form.elements[1].value
    }
    axios.post("https://crudcrud.com/api/90250ca682df47239e50828ee5bf665d/flipkart",data)
    .then((res)=>{
        ul.innerHTML=""
        handleGetData()

    }).catch((err)=>alert("error on backend api"))
    form.elements[0].value=""
    form.elements[1].value=""

}
function dispalyItem(data){
    const ul=document.querySelector("ul")
    if(data.length>0){
        data.forEach((item,ind)=>{
            const li=document.createElement("li")
            const button=document.createElement("button")
            button.innerText="Delete"
            button.className="btn btn-danger"
            button.addEventListener("click", function(){
                axios.delete(`https://crudcrud.com/api/90250ca682df47239e50828ee5bf665d/flipkart/${item._id}`).then(()=>{
                    ul.innerHTML=""
                    handleGetData()
                })
            })
            li.appendChild(document.createTextNode(`${item.price}    ${item.productName}`))
            li.appendChild(button)
            ul.appendChild(li)
        })
    }


}