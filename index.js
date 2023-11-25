const options = ["BẦU", "CUA", "TÔM", "CÁ", "NAI", "GÀ"]
const gameItems = document.querySelectorAll(".game-item")
const windowStat = document.getElementById("windowStat")
const mainCircle = document.getElementById("main")
const itemsClass = ["left-[120px] top-36", "right-[120px] top-36", "left-1/2 -translate-x-1/2 bottom-36"]
const roundedClass = "w-[640px] h-[640px] border-4 border-gray-400 rounded-full relative"

window.addEventListener("load", () => {
    const [bc, tabIndex] = initBroadCastChannel()
    
    if(tabIndex === 1) {
        handleFirstConnection(bc)
    } else {
        handleSecondConnection()
    }
})

const initBroadCastChannel = () => {
    const tabIndex = new URLSearchParams(window.location.search).get("index") | 1

    const bc = new BroadcastChannel("baucuagame")

    return [bc, tabIndex]
}

const handleFirstConnection = (bc) => {
    const mainElements = createMainElements()

    mainCircle.appendChild(mainElements)

    bc.onmessage = e => {
        console.log(e)
    }
}

const handleSecondConnection = () => {
    const coverElement = createCoverElement()

    mainCircle.appendChild(coverElement)

    bc.postMessage() 
}

const createCoverElement = () => {
    const element = document.createElement("div")

    element.className = roundedClass + " bg-black"

    return element
}

const createMainElements = () => {
    const element = document.createElement("div")

    element.className = roundedClass

    itemsClass.forEach(item => {
        const div = document.createElement("div")
        div.className = "game-item absolute rounded-[20px] border-4 border-gray-400 w-[112px] h-[112px] " + item
        
        element.appendChild(div)
    })

    return element
}

const createSquared = () => {
    
}