class PopupSuggestion {
  constructor(jsonUrl, options = {}) {
    this.options = this.initializeOptions(options);
    this.jsonUrl = jsonUrl;
    this.inputBuffer = "";
    this.jsonData = [];
    this.activeInput = null;
    this.selectedIndex = -1;

    this.popup = this.createPopupElement();
    this.loadData();
    this.setupListeners();
  }

  initializeOptions(options) {
    return {
      fontSize: options.fontSize || "12px",
      zIndex: options.zIndex || "1000",
      itemPadding: options.itemPadding || "5px",
      backgroundColor: options.backgroundColor || "#0e1116",
      color: options.color || "white",
      borderRadius: options.borderRadius || "7px",
      hoverColor: options.hoverColor || "#386ee3",
      borderColor:
        options.borderColor ||
        this.getLightBorderColor(options.color || "white"),
      width: options.width || "300px",
      height: options.height || "200px",
      textOverflow: options.textOverflow || "wrap",
      showBorders: options.showBorders !== false,
    };
  }

  getLightBorderColor(textColor) {
    const div = document.createElement("div");
    div.style.color = textColor;
    document.body.appendChild(div);
    const computedColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);

    let [r, g, b] = computedColor.match(/\d+/g).map(Number);
    r = Math.min(r + 100, 255);
    g = Math.min(g + 100, 255);
    b = Math.min(b + 100, 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

  createPopupElement() {
    const popup = document.createElement("div");
    popup.id = "popup-suggestions";
    Object.assign(popup.style, {
      position: "absolute",
      background: this.options.backgroundColor,
      color: this.options.color,
      border: "1px solid #ccc",
      borderRadius: this.options.borderRadius,
      display: "none",
      zIndex: this.options.zIndex,
      maxHeight: this.options.height,
      maxWidth: this.options.width,
      overflowY: "auto",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
      fontSize: this.options.fontSize,
    });
    document.body.appendChild(popup);
    return popup;
  }

  async loadData() {
    try {
      const response = await fetch(this.jsonUrl, {
        headers: this.options.headers ?? {},
      });
      this.jsonData = await response.json();
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  }

  setupListeners() {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("click", (event) =>
      this.handleClickOutside(event)
    );
  }

  handleKeyDown(event) {
    const activeElement = document.activeElement;

    if (
      this.isNumberKey(event, activeElement) &&
      this.popup.style.display !== "block"
    ) {
      this.showPopup(activeElement, event.key);
      this.popup.style.display = "block";
      this.updatePopup();
    } else if (
      this.popup.style.display === "block" ||
      this.inputBuffer.length > 0
    ) {
      this.handlePopupInteraction(event);
    }
  }

  isNumberKey(event, activeElement) {
    return !isNaN(event.key)
      && activeElement.tagName === "INPUT"
      && activeElement.classList.contains("popup-id-suggestions");
  }

  showPopup(activeElement, number) {
    this.activeInput = activeElement;
    this.inputBuffer += number;
    this.popup.innerHTML = "";
    this.popup.style.display = "block";
    this.positionPopup(activeElement);
    this.updatePopup();
  }

  handlePopupInteraction(event) {
    switch (event.key) {
      case "Escape":
        this.closePopup();
        break;
      case "ArrowDown":
        this.navigatePopup(1);
        break;
      case "ArrowUp":
        this.navigatePopup(-1);
        break;
      case "Enter":
        if (this.selectedIndex !== -1) this.selectItem(this.selectedIndex);
        break;
      case "Backspace":
        this.inputBuffer = this.inputBuffer.slice(0, -1);
        this.updatePopup();
        if (this.inputBuffer.length === 0) {
          this.closePopup();
        }
        break;
      default:
        if (/\d/.test(event.key)) {
          this.inputBuffer += event.key;
          this.updatePopup();
        }
        break;
    }
  }

  handleClickOutside(event) {
    if (!this.popup.contains(event.target)) {
      this.closePopup();
    }
  }

  updatePopup() {
    this.popup.innerHTML = "";
    const query = this.inputBuffer.toLowerCase();
    this.filteredData = this.filterData(query);

    if (this.filteredData.length === 0) {
      this.popup.style.display = "none";
      return;
    }

    this.selectedIndex = -1;
    this.filteredData.forEach((item, index) =>
      this.createPopupItem(item, index, this.filteredData.length)
    );
    this.popup.style.display = "block";
  }

  filterData(query) {
    return this.jsonData.filter((item) => item.id.toString().startsWith(query));
  }

  createPopupItem(item, index, totalItems) {
    const div = document.createElement("div");
    div.textContent = `${item.id} - ${item.title}`;
    Object.assign(div.style, {
      cursor: "pointer",
      padding: this.options.itemPadding,
      whiteSpace: this.options.textOverflow === "wrap" ? "normal" : "nowrap",
      overflow: "hidden",
      textOverflow: this.options.textOverflow === "wrap" ? "clip" : "ellipsis",
      borderBottom:
        this.options.showBorders && index !== totalItems - 1
          ? `1px solid ${this.options.borderColor}`
          : "none",
    });

    div.addEventListener("mouseover", () => {
      this.selectedIndex = index;
      this.highlightSelectedItem();
    });

    div.addEventListener("mouseleave", () => {
      this.selectedIndex = -1;
      this.highlightSelectedItem();
    });

    div.addEventListener("click", () => {
      this.selectItem(index);
    });

    this.popup.appendChild(div);
  }

  highlightSelectedItem() {
    Array.from(this.popup.children).forEach((child, index) => {
      child.style.background =
        index === this.selectedIndex ? this.options.hoverColor : "transparent";
    });
  }

  navigatePopup(direction) {
    const items = this.popup.children;
    if (items.length === 0) return;

    this.selectedIndex =
      (this.selectedIndex + direction + items.length) % items.length;
    this.highlightSelectedItem();
  }

  selectItem(index) {
    const item = this.filteredData[index];
    if (!item || !this.activeInput) return;

    const cursorPosition = this.activeInput.selectionStart;
    const beforeText = this.activeInput.value.substring(
      0,
      cursorPosition - this.inputBuffer.length
    );
    const afterText = this.activeInput.value.substring(cursorPosition);

    const newText = beforeText + `${item.id} ` + afterText;
    this.activeInput.value = newText;
    this.activeInput.focus();

    const newCursorPosition = beforeText.length + `${item.id} `.length;
    this.activeInput.setSelectionRange(newCursorPosition, newCursorPosition);

    this.inputBuffer = "";
    this.closePopup();
  }

  positionPopup(element) {
    const rect = element.getBoundingClientRect();
    this.popup.style.left = `${rect.left + window.scrollX}px`;
    this.popup.style.top = `${rect.bottom + window.scrollY}px`;
  }

  closePopup() {
    this.popup.style.display = "none";
    this.selectedIndex = -1;
  }
}

export default PopupSuggestion;
