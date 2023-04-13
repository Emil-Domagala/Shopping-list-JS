const top1 = document.querySelector(".top");
const bottom1 = document.querySelector(".bottom");
const wrapper = document.querySelector(".wrapper");

let mainInput;
let mainButton;
let list;
let warning;
let item;
let checkBoxPadding;
let editWrapper;
let editInput;
let closePopupBtn;
let currentItemContent;
let applyBtn;

const maine = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	mainInput = document.querySelector(".main-input");
	mainButton = document.querySelector(".main-button");
	list = document.querySelector(".list");
	warning = document.querySelector(".warning");
	editWrapper = document.querySelector(".edit-wrapper");
	editInput = document.querySelector(".edit-input");
	closePopupBtn = document.querySelector(".cancel-button");
	applyBtn = document.querySelector(".apply-button");
};
const prepareDOMEvents = () => {
	mainButton.addEventListener("click", newItem);
	// checkBoxPadding.addEventListener("click", doneItem);
	list.addEventListener("click", whithButton);
	closePopupBtn.addEventListener("click", editFunctionPopupClose);
	applyBtn.addEventListener("click", editFunctionAprove);
	editInput.addEventListener("keyup", keyUpEditInput);
	mainInput.addEventListener("keyup", keyUpInput);
};

const newItem = () => {
	if (mainInput.value !== "") {
		item = document.createElement("div");
		item.classList.add("item");
		list.append(item);
		warning.textContent = "";
		newContentBox();
		mainInput.value = "";
	} else {
		warning.textContent = "Wpisz produkt!";
		bottom1.scrollTop = 0;
	}
};

const newContentBox = () => {
	const contentBox = document.createElement("div");
	contentBox.classList.add("content-box");
	item.append(contentBox);
	const checkBoxPadding = document.createElement("div");
	checkBoxPadding.classList.add("check-box-padding");
	contentBox.append(checkBoxPadding);
	const checkBox = document.createElement("div");
	checkBox.classList.add("check-box");
	checkBoxPadding.append(checkBox);
	checkBox.innerHTML = "<i class='fa-sharp fa-solid fa-check'></i>";

	const content = document.createElement("div");
	content.classList.add("content");
	contentBox.append(content);
	content.textContent = mainInput.value;
	newToolBox();
};
const newToolBox = () => {
	const toolBox = document.createElement("div");
	toolBox.classList.add("tool-box");
	item.append(toolBox);
	const editPadding = document.createElement("div");
	editPadding.classList.add("edit-padding");
	toolBox.append(editPadding);
	const editBox = document.createElement("div");
	editBox.classList.add("edit-box");
	editPadding.append(editBox);
	editBox.innerHTML = '<i class="fa-sharp fa-solid fa-pen"></i>';

	const deletePadding = document.createElement("div");
	deletePadding.classList.add("delete-padding");
	toolBox.append(deletePadding);
	const deleteBox = document.createElement("div");
	deleteBox.classList.add("delete-box");
	deletePadding.append(deleteBox);
	deleteBox.innerHTML = '<i class="fa-solid fa-xmark"></i>';
};

// const doneItem = () => {
// 	item.classList.add('done');
// };

const whithButton = (e) => {
	clickedButton = e.target;

	if (
		clickedButton.matches(".check-box-padding") ||
		clickedButton.matches(".check-box")
	) {
		doneFunction(e);
	} else if (
		clickedButton.matches(".edit-padding") ||
		clickedButton.matches(".edit-box")
	) {
		editFunctionPopupShow(e);
	} else if (
		clickedButton.matches(".delete-padding") ||
		clickedButton.matches(".delete-box")
	) {
		deleteFunction(e);
	}
};

const doneFunction = (e) => {
	e.target.closest(".item").classList.toggle("done");
};
const editFunctionPopupShow = (e) => {
	const currentItem = e.target.closest(".item");
	currentItemContent = currentItem.querySelector(".content");
	editWrapper.style.display = "flex";
	editInput.value = currentItemContent.textContent;
};
const editFunctionAprove = () => {
	currentItemContent.textContent = editInput.value;
	editWrapper.style.display = "none";
};
const editFunctionPopupClose = () => {
	editWrapper.style.display = "none";
};
const deleteFunction = (e) => {
	const currentItem = e.target.closest(".item");
	currentItem.remove();
};

const keyUpEditInput = (e) => {
	if (e.key === "Enter") {
		editFunctionAprove();
	}
};

const keyUpInput = (e) => {
	if (e.key === "Enter") {
		newItem();
	}
};

const elementHeight = () => {
	let topHeight = top1.scrollHeight;
	let wrapperHeight = window.getComputedStyle(wrapper).height;

	bottom1.style.setProperty(
		"Height",
		`calc(${wrapperHeight} - ${topHeight}px)`
	);
};

window.addEventListener("resize", elementHeight);
window.addEventListener("DOMContentLoaded", elementHeight);
document.addEventListener("DOMContentLoaded", maine);
