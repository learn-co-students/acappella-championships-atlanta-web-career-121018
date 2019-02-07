document.addEventListener("DOMContentLoaded", setupPage)
let groupTable = document.querySelector('#table-body')
let winnerContainer = document.querySelector('#winner')

function setupPage() {
    renderAllGroups()
} 

function renderAllGroups() {
    groupTable.textContent = ""
    const url = `http://localhost:3000/a_cappella_groups`
    getGroup(url).then(function(data){
        data.forEach(renderGroup) 
    })
}  

function getGroup(url) {
    return fetch(url).then(res => res.json()) 
} 

function renderGroup(group) {
    let element = document.createElement('tr')
        let college = document.createElement('td')
        college.textContent = group.college.name
        element.appendChild(college) 

        let groupName = document.createElement('td')
        groupName.textContent = group.name
        element.appendChild(groupName)

        let membership = document.createElement('td')
        membership.textContent = group.membership 
        element.appendChild(membership) 

        let division = document.createElement('td')
        division.textContent = group.college.division 
        element.appendChild(division)

        let picCont = document.createElement('td')
            let trophy = document.createElement('img')
            trophy.src = './assets/trophy.png'
            trophy.dataset.id = group.id
            trophy.addEventListener("click", () => crownWinner(group))
            picCont.appendChild(trophy) 
        element.appendChild(picCont) 

        let delBtn = document.createElement('button')
        delBtn.textContent = 'Delete'
        delBtn.addEventListener("click", () => removeGroup(group))
        element.appendChild(delBtn)

    groupTable.appendChild(element)
}  

function crownWinner(group) {
    let id = group.id 
    renderWinner(id) 

    let winner = event.target.parentElement.parentElement
    winner.parentElement.removeChild(winner)
} 

function renderWinner(winnerId) {
    winnerContainer.textContent = "" 

    if (winnerContainer.dataset.id) {
        let loserId = winnerContainer.dataset.id 
        let loserUrl = `http://localhost:3000/a_cappella_groups/${loserId}`; getGroup(loserUrl).then(renderGroup)
    }
    let winnerUrl = `http://localhost:3000/a_cappella_groups/${winnerId}`; 
    getGroup(winnerUrl).then(showWinner)

}

function showWinner(group) {
    winnerContainer.textContent = 'Winner: ' + group.name
    winnerContainer.dataset.id = group.id
}  

function removeGroup(group) {
    let id = group.id 
    deleteGroup(id) 
    let byeGroup = event.target.parentElement
    byeGroup.parentElement.removeChild(byeGroup)
} 

function deleteGroup(id) {
    return fetch(`http://localhost:3000/a_cappella_groups/${id}`,{
        method: 'DELETE',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, 
      })  
}