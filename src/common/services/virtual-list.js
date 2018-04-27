class VirtualList {

    build(config){
        let list = new VirtualList();
        list.init(config)
        return list;
    }
    
	init(config) {
        this.config = config;
		let width = (config && config.w + "px") || "100%";
		let height = (this.height = (config && config.h + "px") || "100%");
        let itemHeight = this.itemHeight || config.itemHeight;
        this.itemHeight = itemHeight;
        this.rowClass = config.rowClass;
        this.containerClass = config.containerClass;
        this.onScroll = config.onScroll;

        this.items = config.items;
		this.renderRow = config.renderRow;
        this.onRenderComplete = config.onRenderComplete;
        this.totalRows = config.totalRows || (config.items && config.items.length);

		let totalHeight = itemHeight * this.totalRows;
        this.scroller = this.createScroller(totalHeight);
        this.container = this.createContainer(width, height);
        if(config.id){
            this.container.id = config.id;
        }

        if(this.containerClass){
            this.container.classList.add(this.containerClass);
        }

		let screenItemsLen = Math.ceil(config.h / itemHeight);
		// Cache 4 times the number of items that fit in the container viewport
        let cachedItemsLen = screenItemsLen * 3;
		this.renderChunk(this.container, 0, cachedItemsLen / 2);

		var self = this;
		let lastRepaintY;
        let maxBuffer = screenItemsLen * itemHeight;

		function onScroll(e) {
			let scrollTop = e.target.scrollTop;
			let scrollLeft = e.target.scrollLeft;
			let first = parseInt(scrollTop / itemHeight) - screenItemsLen;
			first = first < 0 ? 0 : first;
			if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
				self.renderChunk(self.container, first, cachedItemsLen);
				lastRepaintY = scrollTop;
            }
            
            if(self.onScroll){
                self.onScroll(e, self);
            }

			e.preventDefault && e.preventDefault();
		}

        this.container.addEventListener("scroll", onScroll);
        return new VirtualList();
	}

    renderChunk(node, fromPos, howMany) {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(this.scroller);

        let finalItem = fromPos + howMany;
        if (finalItem > this.totalRows) finalItem = this.totalRows;

        for (let i = fromPos; i < finalItem; i++) {
            let item;
            if (this.renderRow) {
                item = this.renderRow(i);
            } else {
                if (typeof this.items[i] === "string") {
                    let itemText = document.createTextNode(this.items[i]);
                    item = document.createElement("div");
                    item.style.height = this.itemHeight;
                    item.appendChild(itemText);
                } else {
                    item = this.items[i];
                }
            }
            if(this.rowClass){
                item.classList.add(this.rowClass);
            }
            item.style.position = "absolute";
            item.style.top = i * this.itemHeight + "px";
            item.style.height = this.itemHeight + "px";
            fragment.appendChild(item);
        }

        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
        node.appendChild(fragment);
        if(this.onRenderComplete){
            this.onRenderComplete(this);
        }
    };

    createContainer(w, h) {
        let c = this.config.container || document.createElement("div");
        c.style.width = w;
        c.style.height = h;
        c.style.overflow = "auto";
        c.style.position = "relative";
        c.style.padding = 0;
        return c;
    };

    createScroller(h) {
        let scroller = document.createElement("div");
        scroller.style.opacity = 0;
        scroller.style.position = "absolute";
        scroller.style.top = 0;
        scroller.style.left = 0;
        scroller.style.width = "1px";
        scroller.style.height = h + "px";
        return scroller;
    };

}

export default VirtualList;
