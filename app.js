const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const DEFAULT_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;

}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        modeBtn.innerText = "채우기";
    } else {
        filling = true;
        modeBtn.innerText = "그리기";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "내 그림🎨";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}