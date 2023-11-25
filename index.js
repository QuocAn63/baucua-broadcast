const options = ["BẦU", "CUA", "TÔM", "CÁ", "NAI", "GÀ"]
const windowStat = document.getElementById("windowStat")
const mainCircle = document.getElementById("main")
const itemsClass = ["left-[120px] top-36", "right-[120px] top-36", "left-1/2 -translate-x-1/2 bottom-36"]
const roundedClass = "w-[640px] h-[640px] border-4 border-gray-400 rounded-full relative"

window.addEventListener("load", () => {
    const [bc, tabIndex] = initBroadCastChannel()
    
    if(tabIndex === 1) {
        handleFirstConnection(bc)
    } else {
        handleSecondConnection(bc)
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

    const { top, bottom, left, right } = createSquared()

    bc.onmessage = e => {
        const coverX = e.data.x
        const coverY = e.data.y
        console.log(`X: ${left} - ${coverX} - ${right}`)
        console.log(`Y: ${top} - ${coverY} - ${bottom}`)

        if((top < coverX && coverX < bottom) && (left < coverY && coverY < right)) {
            console.log("Shaking...")
        }
    }
}

const handleSecondConnection = (bc) => {
    const coverElement = createCoverElement()
    let oldX = window.screenX
    let oldY = window.screenY

    setInterval(() => {
        if(oldX !== window.screenX || oldY !== window.screenY) {
            oldX = window.screenX
            oldY = window.screenY
            bc.postMessage({x: oldX, y: oldY}) 
        }
    }, 100)

    mainCircle.appendChild(coverElement)
}

const createCoverElement = () => {
    const element = document.createElement("div")

    element.className = roundedClass + " bg-gray-400"

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
    const items = window.document.querySelectorAll(".game-item")
    let top = 9999
    let bottom = 0
    let right = 0
    let left = 9999
    console.log(items)

    items.forEach(item => {
        const rect = item.getBoundingClientRect()

        top = Math.min(top, rect.top)
        bottom = Math.max(bottom, rect.bottom)
        left = Math.min(left, rect.left)
        right = Math.max(right, rect.right)
    })

    return {top, bottom, left, right}
}