const edit = document.querySelectorAll("#edit")
const remove = document.querySelectorAll("#remove")
const cancel = document.getElementById("cancelBtn")

const popupEditContainer = document.querySelector(".popup-edit-container")
const editName = document.getElementById("editName")
const editEmail = document.getElementById("editEmail")
const editPhone = document.getElementById("editPhone")
const editTitle = document.getElementById("editTitle")

edit.forEach(e => {
    e.addEventListener("click", () => {
        popupEditContainer.classList.add("show")

        const parent = e.parentNode.parentElement
        const thisId = parent.firstElementChild.textContent
        const thisName = parent.childNodes[3].textContent
        const thisEmail = parent.childNodes[5].textContent
        const thisPhone = parent.childNodes[7].textContent
        const thisTitle = parent.childNodes[9].textContent

        editName.value = thisName
        editEmail.value = thisEmail
        editPhone.value = thisPhone
        editTitle.value = thisTitle
    })
})

cancel.addEventListener("click", () => {
    popupEditContainer.classList.remove("show")
})

remove.forEach(r => {
    r.addEventListener("click", () => {
        const parent = r.parentNode.parentElement
        const thisId = parent.firstElementChild.textContent

        fetchPost(thisId)
    })
})

async function fetchPost(id) {
    const options = {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" }
    }

    const r = await fetch("/remove", options)
    
    r.json()
        .then(() => location.reload())
        .catch((err) => console.log(err))
}